#!/usr/bin/env python3
"""Post to Reddit using PRAW. Credentials from /data/workspace/.env"""
import argparse
import os
import sys
import json
from datetime import datetime

def load_env():
    env_file = '/data/workspace/.env'
    if os.path.exists(env_file):
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

def main():
    parser = argparse.ArgumentParser(description='Post to Reddit')
    parser.add_argument('--subreddit', required=True, help='Target subreddit (without r/)')
    parser.add_argument('--title', required=True, help='Post title')
    parser.add_argument('--url', help='URL for link post')
    parser.add_argument('--selftext', help='Body text for self post')
    parser.add_argument('--flair', help='Post flair text')
    parser.add_argument('--dry-run', action='store_true', help='Print without posting')
    args = parser.parse_args()

    load_env()

    required = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD']
    missing = [k for k in required if not os.environ.get(k)]
    if missing:
        print(f'Missing env vars: {", ".join(missing)}')
        print('Add them to /data/workspace/.env')
        sys.exit(1)

    if args.dry_run:
        print(f'[DRY RUN] Would post to r/{args.subreddit}:')
        print(f'  Title: {args.title}')
        if args.url:
            print(f'  URL: {args.url}')
        if args.selftext:
            print(f'  Body: {args.selftext[:200]}...')
        return

    import praw

    reddit = praw.Reddit(
        client_id=os.environ['REDDIT_CLIENT_ID'],
        client_secret=os.environ['REDDIT_CLIENT_SECRET'],
        username=os.environ['REDDIT_USERNAME'],
        password=os.environ['REDDIT_PASSWORD'],
        user_agent=f'CalcLeap Bot v1.0 by /u/{os.environ["REDDIT_USERNAME"]}'
    )

    subreddit = reddit.subreddit(args.subreddit)

    try:
        if args.url:
            submission = subreddit.submit(args.title, url=args.url)
        elif args.selftext:
            submission = subreddit.submit(args.title, selftext=args.selftext)
        else:
            print('Error: must provide --url or --selftext')
            sys.exit(1)

        result = {
            'success': True,
            'subreddit': args.subreddit,
            'title': args.title,
            'url': f'https://reddit.com{submission.permalink}',
            'id': submission.id,
            'timestamp': datetime.now().isoformat()
        }
        print(json.dumps(result, indent=2))

        log_file = '/data/workspace/reddit-post-log.jsonl'
        with open(log_file, 'a') as f:
            f.write(json.dumps(result) + '\n')

    except Exception as e:
        result = {
            'success': False,
            'error': str(e),
            'subreddit': args.subreddit,
            'timestamp': datetime.now().isoformat()
        }
        print(json.dumps(result, indent=2))
        sys.exit(1)

if __name__ == '__main__':
    main()
