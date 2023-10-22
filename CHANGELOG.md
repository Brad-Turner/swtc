# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.0.0

- BREAKING: Removed lifecycle hooks `containers` and `run` from swtc configuration file. This has been replaced by a new configuration object, see the [SWTC Documentation](https://brad-turner.github.io/swtc/) for more information.
- Upgrade package to using ESM modules by default.
- Drop support for node 12, 14, and 16. Minimum supported version is now node 18.
- Changed the default SWTC configuration file location from `swtc.ts` to `.swtc.ts` to move it inline with other similar packages.
- Moved testcontainers and ts-node to the list of peer dependencies.

## 1.2.0

- Add support for commands supplied to Docker containers.

## 1.1.0

### Added

- Add commander to improve CLI experience.

## 1.0.3

### Added

- Add listeners for window shutdown signals `SIGHUP` and `SIGBREAK`.
- Add settings to allow configurable path to swtc file.
- Add examples directory for common use-cases.
- Add github pages for API docs

### Changed

- Modified documentation

## 1.0.2

### Changed

- Fix missing package testcontainers.

## 1.0.1

### Changed

- Modified logging to give more feedback to the user.
- Modified bin file to load ts-node before running swtc.

## 1.0.0

First release 🎉🎉

### Added

- First iteration of the SWTC cli tool
