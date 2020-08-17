# Change Log
All notable changes to the "vscode-ghq" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.0] - 2020/08/18
- Fixed a problem that repos located in non-primary ghq.root cannot be opened.
- Updated dependencies

## [0.5.4] - 2020/04/05
- Updated dependencies

## [0.5.3] - 2019/07/16
- Updated dependencies
- Fixed module import

## [0.5.2] - 2018/11/27
- Fixed mistake.

## [0.5.1] - 2018/11/27
- Updated dependencies

## [0.5.0] - 2018/09/12
### Added
- `extension.ghqOpenInBrowser` : Open Repository in Default Browser

### Fixed
- Fix the way of getting stdout of child_process.exec

## [0.4.1] - 2018-08-16

### Fixed
- Fix an issue that URI creation on Windows didn't work
- Remove empty line from `ghq list` output

## [0.4.0] - 2018-08-05

### Added
- `extension.ghqAddToWorkSpace` : Add Repository to Current Workspace

## [0.3.0] - 2016-12-26

### Added
- `extension.ghqOpenInNewWindow` : Open Repository in New Window

### Changed
- Rename `extension.ghqMove` to `extension.ghqOpen`

## [0.2.0] - 2016-12-24

### Added
- Initial release
- `extension.ghqMove` : Move to repository
- `extension.ghqGet` : Get Repository

