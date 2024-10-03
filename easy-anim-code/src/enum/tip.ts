const TIPS = {
    enableText: '来自easy-anim-code的提示',
    restartText: 'restart',
    isBackUpText: 'easy-anim-code.enable 已执行过，本次中止执行',
}

const BACKUP_FILE_SUFFIX = 'easy-anim-code-backup-'

const workbenchHtmlTemplate = `<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
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

const workbenchApcExtensionHtmlTemplate = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />

</head>

<body aria-label=""></body>
<!-- Startup (do not modify order of script tags!) -->
<script src="../../../patch/browser.main.js"></script>
<script src="workbench.js"></script>

</html>`

export { TIPS, BACKUP_FILE_SUFFIX, workbenchHtmlTemplate, workbenchApcExtensionHtmlTemplate }
