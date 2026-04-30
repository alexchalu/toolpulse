from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="calcleap",
    version="1.0.0",
    author="Alex Chalunkal",
    author_email="alex@calcleap.com",
    description="Python client for CalcLeap API - 2,900+ free calculators",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/alexchalu/calcleap-api",
    project_urls={
        "Homepage": "https://calcleap.com",
        "API Documentation": "https://calcleap.com/api-docs.html",
        "Bug Tracker": "https://github.com/alexchalu/calcleap-api/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Intended Audience :: Developers",
        "Topic :: Office/Business :: Financial",
        "Topic :: Scientific/Engineering :: Mathematics",
    ],
    packages=find_packages(),
    python_requires=">=3.6",
    install_requires=[],
)
