// 消息弹窗的文字枚举
const TIPS = {
    enableText: '来自easy-anim-code的提示',
    restartText: 'restart',
    isBackUpText: '插件已执行过，本次中止执行',
    errorText: '执行出现异常',
}

// 命令枚举
const COMMANDS = {
    enable: 'easy-anim-code.enable',
    disable: 'easy-anim-code.disable',
    reset: 'easy-anim-code.reset',
}

// 备份文件的后缀
const BACKUP_FILE_SUFFIX = 'easy-anim-code-backup-'

// 主文件枚举
const PRIMARY_FILE = {
    workbench: 'workbench.html',
    workbenchApcExtension: 'workbench-apc-extension.html',
    backupWorkbench: BACKUP_FILE_SUFFIX + 'workbench.html',
    backupWorkbenchApcExtension: BACKUP_FILE_SUFFIX + 'workbench-apc-extension.html',
}

// 扩展配置枚举
const EXTENSION_CONFIG = {
    PrimaryColor: {
        key: 'PrimaryColor',
        default: '#2aaaff',
    },
    AnimLevel: {
        key: 'AnimLevel',
        default: 'low',
    },
}

// 动画等级枚举
const ANIM_LEVEL = {
    low: ``,
    high: `.part.sidebar.pane-composite-part {
	     .pane-body {
            .monaco-list-row {
                .monaco-tl-row {
                    .monaco-tl-twistie {
                        transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    animation: easy-anim-opacity-animation-low-opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            }

            .monaco-tree-sticky-container {
                .monaco-tl-row {
                    animation: none;
                }
            }
        }
		}`,
}

// 主文件原始备份模板
const WORKBENCH_HTML_TEMPLATE = `<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="Content-Security-Policy" content="
				default-src
					'none'
				;
				img-src
					'self'
					data:
					blob:
					vscode-remote-resource:
					vscode-managed-remote-resource:
					https:
				;
				media-src
					'self'
				;
				frame-src
					'self'
					vscode-webview:
				;
				script-src
					'self'
					'unsafe-eval'
					blob:
				;
				style-src
					'self'
					'unsafe-inline'
				;
				connect-src
					'self'
					https:
					ws:
				;
				font-src
					'self'
					vscode-remote-resource:
					vscode-managed-remote-resource:
					https://*.vscode-unpkg.net
				;
				require-trusted-types-for
					'script'
				;
				trusted-types
					amdLoader
					cellRendererEditorText
					defaultWorkerFactory
					diffEditorWidget
					diffReview
					domLineBreaksComputer
					dompurify
					editorGhostText
					editorViewLayer
					notebookRenderer
					stickyScrollViewLayer
					tokenizeToString
				;
		" />

</head>

<body aria-label=""></body>
<!-- Startup (do not modify order of script tags !) -->
<script src="workbench.js"></script>

</html>`

// 扩展主文件原始备份模板
const WORKBENCH_APC_EXTENSION_HTML_TEMPLATE = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />

</head>

<body aria-label=""></body>
<!-- Startup (do not modify order of script tags!) -->
<script src="../../../patch/browser.main.js"></script>
<script src="workbench.js"></script>

</html>`

export {
    TIPS,
    COMMANDS,
    ANIM_LEVEL,
    PRIMARY_FILE,
    EXTENSION_CONFIG,
    BACKUP_FILE_SUFFIX,
    WORKBENCH_HTML_TEMPLATE,
    WORKBENCH_APC_EXTENSION_HTML_TEMPLATE,
}
