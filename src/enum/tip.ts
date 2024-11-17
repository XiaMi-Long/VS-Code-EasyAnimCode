// 消息弹窗的文字枚举
const TIPS = {
    enableText: '来自easy-anim-code的提示',
    restartText: '重启VSCode（Restart VSCode.）',
    isBackUpText: '插件已执行过，本次中止执行（The plugin has already been executed, execution is terminated this time.）',
    errorText: '执行出现异常（The execution encountered an exception.）',
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
    workbench: 'workbench.esm.html',
    backupWorkbench: BACKUP_FILE_SUFFIX + 'workbench.esm.html',
}

// 扩展配置枚举
const EXTENSION_CONFIG = {
    PrimaryColor: {
        key: 'PrimaryColor',
        default: '#2aaaff',
    },
    BackgroundImage: {
        key: 'BackgroundImage',
        default: 'none',
    },
    BackgroundImageBlur: {
        key: 'BackgroundImageBlur',
        default: 30,
    },
    VSCodeBackgroundOpacity: {
        key: 'VSCodeBackgroundOpacity',
        default: 0.9,
    },
    CursorWidth: {
        key: 'CursorWidth',
        default: 2,
    },
    CursorBackgroundColor: {
        key: 'CursorBackgroundColor',
        default: 'none',
    },
}

// 主文件原始备份模板
const WORKBENCH_HTML_TEMPLATE = `<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta
			http-equiv="Content-Security-Policy"
			content="
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
		"/>
	</head>

	<body aria-label="">
	</body>

	<!-- Startup (do not modify order of script tags!) -->
	<script src="./workbench.js" type="module"></script>
</html>
`

export { TIPS, COMMANDS, PRIMARY_FILE, EXTENSION_CONFIG, BACKUP_FILE_SUFFIX, WORKBENCH_HTML_TEMPLATE }
