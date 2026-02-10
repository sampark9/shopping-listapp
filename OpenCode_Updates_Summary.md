# OpenCode Updates Summary - February 2026

## Overview
OpenCode has been rapidly evolving with frequent releases focusing on stability improvements, new model support, enhanced user experience, and expanded provider compatibility. This summary covers the most significant updates from January to February 2026.

## Latest Release: v1.1.53 (February 5, 2026)

### Core Improvements
- **Plugin System Enhancement**: User plugins now load after built-in plugins and can override built-in plugins for the same provider
- **Error Handling**: Fixed unhandled errors when aborting with queued messages
- **Model Support**: Moved Codex 5.3 model definition to plugin to avoid showing unsupported model to other users
- **Session Tracking**: Added session usage tracking to ACP (Admin Control Panel)
- **GPT-5.3 Integration**: Updated transforms for GPT-5.3 model

### TUI Updates
- **Mouse Interaction**: Allow mouse escape via "esc" labels in dialogs

### Desktop Application
- **UI Improvements**: Made close comment button visible in prompt input
- **Terminal Stability**: More terminal stability fixes
- **File Management**: 
  - Modified file color contrast for better visibility
  - Added button to open files in external applications
  - Allow toggling file tree closed independently
- **Workspace Management**: Stop showing SessionSkeleton on new workspace
- **User Experience**: Hide prompt input when there are permissions requests or questions

## Recent Major Updates (v1.1.52 - v1.1.49)

### v1.1.52 (February 5, 2026)
**Core:**
- **Claude 3.5 Sonnet Support**: Enabled the new Claude 3.5 Sonnet model
- **Plugin Installation**: Fixed plugin installation to use direct package.json manipulation
- **Image Handling**: Fixed image reading with OpenAI-compatible providers like Kimi K2.5
- **Proxy Support**: Silently ignore proxy command failures to prevent config initialization crashes
- **Model Autocomplete**: Added models.dev schema reference for model autocomplete in opencode.json

**Desktop:**
- **File Synchronization**: File tree now kept in sync with filesystem changes
- **Localization**: Added Bosnian locale support
- **Terminal Improvements**: Fixed terminal URL handling issues and end-of-line handling
- **Workspace Management**: Refresh workspace sessions when switching projects

### v1.1.51 (February 4, 2026)
**Core:**
- **Header Management**: Reverted change that caused headers to be double merged
- **Documentation**: Documented the built-in agents
- **Model Configuration**: Prevented double-prefixing of Bedrock cross-region inference models

### v1.1.50 (February 4, 2026)
**Core:**
- **Memory Management**: Prevent memory leaks from AbortController closures
- **Model Support**: Added/Reverted Trinity model system prompt support
- **Environment Hooks**: Added shell.env hook for manipulating environment in tools and shell
- **Theme Support**: Allowed theme colors in agent customization
- **Skills System**: Improved skills system with better prompting and permissions

**Desktop:**
- **Performance**: Faster end-to-end tests
- **UI Enhancements**: Improved spacing in application UI
- **Session Management**: Restore previously opened session tabs on app restart

### v1.1.49 (February 3, 2026)
**Core:**
- **Network Features**: Added --mdns-domain flag to customize mDNS hostname
- **Formatters**: Added Ormolu code formatter for Haskell
- **Clipboard**: Use OpenTUI OSC52 clipboard implementation
- **File Management**: Fixed binary file handling in file view

**Desktop:**
- **UI/UX**: Major improvements to responsive design and user interface
- **Navigation**: Added keyboard shortcuts for navigating between unread sessions
- **File Tree**: Enhanced file tree with better performance and styling

## Key Trends and Improvements

### 1. **Model Support Expansion**
- Continuous addition of new models (Claude 3.5 Sonnet, GPT-5.3, Trinity)
- Improved compatibility with various providers (OpenAI, Anthropic, Google Vertex)
- Enhanced reasoning variants support

### 2. **Plugin System Enhancements**
- Better plugin installation and management
- User plugin override capabilities
- Improved plugin loading order

### 3. **Desktop Application Maturity**
- Significant UI/UX improvements
- Better file tree management and synchronization
- Enhanced workspace and session management
- Improved localization support

### 4. **Performance and Stability**
- Memory leak fixes
- Better error handling
- Improved terminal stability
- Enhanced test coverage

### 5. **Developer Experience**
- Better model autocomplete
- Improved configuration management
- Enhanced skills system
- Better documentation

## Community and Ecosystem

### Statistics
- **GitHub Stars**: 95K+ (growing rapidly)
- **Monthly Active Users**: 650K+
- **Release Frequency**: Nearly daily releases with active development

### Community Contributions
- Active community involvement with numerous contributors
- Regular bug fixes and feature additions from community members
- Strong focus on user feedback and issue resolution

## Technical Architecture Improvements

### Core System
- Better plugin architecture
- Enhanced model provider system
- Improved session management
- Better error handling and recovery

### Desktop Application
- Tauri-based desktop app with continuous improvements
- Better file system integration
- Enhanced terminal integration
- Improved responsive design

### TUI (Terminal User Interface)
- Better keyboard navigation
- Enhanced mouse support
- Improved theme system
- Better accessibility

## Future Outlook

Based on the recent update patterns, OpenCode is focusing on:
1. **Stability**: Continuous bug fixes and performance improvements
2. **Model Support**: Expanding support for new AI models and providers
3. **User Experience**: Enhancing the desktop and terminal interfaces
4. **Ecosystem**: Growing the plugin system and community contributions
5. **Enterprise Features**: Adding more enterprise-ready capabilities

## Recommendations for Users

### For Current Users
- Update regularly to get the latest stability improvements
- Explore new model support as it becomes available
- Consider trying the desktop application if you haven't already

### For New Users
- The desktop application offers the most polished experience
- TUI remains excellent for terminal-based workflows
- Plugin system allows for extensive customization

### For Developers
- Consider contributing to the plugin ecosystem
- The skills system offers opportunities for custom tool development
- Active development makes it a good project to contribute to

---

*This summary covers OpenCode updates from January 25, 2026 to February 5, 2026. For the most current information, visit [opencode.ai](https://opencode.ai) or check the [GitHub repository](https://github.com/anomalyco/opencode).*

**Last Updated**: February 9, 2026
**Summary Version**: 1.0