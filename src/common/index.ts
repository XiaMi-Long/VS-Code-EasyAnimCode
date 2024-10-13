import { Jimp } from 'jimp'
import * as vscode from 'vscode'
import { TIPS, EXTENSION_CONFIG, ANIM_LEVEL, TERMINAL_ANIMATION, BACKGROUND_OPACITY_TEMPLATE } from '../enum/tip'

/**
 * 重新加载当前窗口
 * 这个函数执行一个命令来重新加载 VS Code 窗口
 */
function reloadWindow() {
    vscode.commands.executeCommand('workbench.action.reloadWindow')
}

/**
 * 显示一个信息通知，提示用户当前的备份状态
 *
 * @remarks
 * 这个函数会调用 vscode.window.showInformationMessage 方法来显示一个信息通知
 * 通知的内容是 TIPS.enableText，标题是 TIPS.isBackUpText
 *
 * @param {void} - 这个函数不接受任何参数
 * @returns {void} - 这个函数不返回任何值
 */
function showIsBackUpNotification() {
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.isBackUpText })
}

/**
 * 启用重启功能
 * 这个函数会显示一个信息消息，提示用户需要重启应用以使更改生效，然后执行重启操作
 * @param {string} TIPS.enableText - 显示给用户的提示信息
 * @param {string} TIPS.restartText - 重启操作的标题
 */
function enabledRestart() {
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.restartText }).then(reloadWindow)
}

/**
 * 显示卸载成功的提示信息，并在用户确认后重新加载窗口
 *
 * @remarks
 * 这个函数用于在插件卸载成功后，向用户显示一条信息提示，并提供一个选项让用户重新加载窗口。
 *
 * @param {string} TIPS.enableText - 要显示的提示信息文本。
 * @param {string} TIPS.restartText - 重新加载窗口的按钮标题。
 *
 * @returns {Promise<void>} - 当用户点击重新加载窗口的按钮时，返回一个 Promise，表示窗口正在重新加载。
 */
function unInstallSuccess() {
    vscode.window.showInformationMessage(TIPS.enableText, { title: TIPS.restartText }).then(reloadWindow)
}

/**
 * 获取 Easy Anim Code 扩展的配置
 * @returns 包含 primaryColor 和 animLevel 的对象
 */
function getEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code')
    const primaryColor = config.get(EXTENSION_CONFIG.PrimaryColor.key)
    const animLevel = config.get(EXTENSION_CONFIG.AnimLevel.key)
    const backgroundImage = config.get(EXTENSION_CONFIG.BackgroundImage.key)
    const backgroundOpacity = config.get(EXTENSION_CONFIG.BackgroundImageOpacity.key)
    const terminalAnimation = config.get(EXTENSION_CONFIG.TerminalAnimation.key)
    return {
        animLevel,
        primaryColor,
        backgroundImage,
        backgroundOpacity,
        terminalAnimation,
    }
}

/**
 * 创建一个根元素的样式模板，该模板定义了一个名为 --vscode-style-easy-anim-red-color 的 CSS 变量，其值为从配置中获取的 primaryColor。
 *
 * @returns 一个包含定义了 CSS 变量的字符串的模板。
 */
function createRootValStyleTemplate() {
    const { primaryColor } = getEasyAnimCodeConfig()
    return `
        :root {
            --vscode-style-easy-anim-red-color: ${primaryColor};
        }
    `
}

/**
 * 根据配置获取高级动画级别。
 *
 * @returns 一个字符串，表示高级动画级别。
 */
function createHighAnimLevel() {
    const { animLevel } = getEasyAnimCodeConfig()
    const highLevel = ANIM_LEVEL[animLevel as keyof typeof ANIM_LEVEL]
    return `${highLevel}`
}

/**
 * 创建终端动画效果的配置字符串
 *
 * @returns {string} 终端动画效果的配置字符串
 */
function createTerminalAnimation() {
    const { terminalAnimation } = getEasyAnimCodeConfig()
    const terminalAnimationLevel = TERMINAL_ANIMATION[terminalAnimation as keyof typeof TERMINAL_ANIMATION]
    return `${terminalAnimationLevel}`
}

/**
 * 对指定路径的图片进行模糊处理，并返回处理后的图片的 base64 编码字符串
 *
 * @param {string} imgPath - 图片的路径
 * @param {number} opacity - 模糊的不透明度，取值范围为 0 到 100
 * @returns {Promise<string>} - 处理后的图片的 base64 编码字符串
 * @throws {Error} - 如果图片处理过程中发生错误，将抛出错误
 */
async function imageBlur(imgPath: string, opacity: number) {
    const base64 = await (await Jimp.read(imgPath)).blur(opacity).getBase64('image/png', {})
    return base64
}

/**
 * 创建背景图片的函数
 * 如果配置中的背景图片为 'none'，则返回空字符串
 * 否则，使用 imageBlur 函数对背景图片进行模糊处理，并返回处理后的图片的 base64 编码字符串
 *
 * @param {string} backgroundImage - 背景图片的路径
 * @param {number} backgroundOpacity - 背景图片的模糊不透明度
 * @returns {Promise<string>} - 处理后的背景图片的 base64 编码字符串
 */
async function createBackgroundImage() {
    const { backgroundImage, backgroundOpacity } = getEasyAnimCodeConfig()
    if (backgroundImage === 'none') {
        return ''
    }
    const base64 = await imageBlur(backgroundImage as string, backgroundOpacity as number)
    return `${base64}`
}

/**
 * 创建背景不透明度样式的函数
 *
 * @returns {string} - 背景不透明度样式模板
 */
function createBackgroundOpacityStyle() {
    return BACKGROUND_OPACITY_TEMPLATE
}

/**
 * 重置 Easy Anim Code 扩展的配置为默认值。
 *
 * 此函数用于将 Easy Anim Code 扩展的配置重置为其默认值。
 * 它会更新 primaryColor 和 animLevel 配置项为其默认值。
 */
function resetEasyAnimCodeConfig() {
    const config = vscode.workspace.getConfiguration('easy-anim-code')
    config.update(EXTENSION_CONFIG.PrimaryColor.key, EXTENSION_CONFIG.PrimaryColor.default, true)
    config.update(EXTENSION_CONFIG.AnimLevel.key, EXTENSION_CONFIG.AnimLevel.default, true)
    config.update(EXTENSION_CONFIG.TerminalAnimation.key, EXTENSION_CONFIG.TerminalAnimation.default, true)
    config.update(EXTENSION_CONFIG.BackgroundImage.key, EXTENSION_CONFIG.BackgroundImage.default, true)
    config.update(EXTENSION_CONFIG.BackgroundImageOpacity.key, EXTENSION_CONFIG.BackgroundImageOpacity.default, true)
}

export {
    reloadWindow,
    enabledRestart,
    unInstallSuccess,
    createHighAnimLevel,
    createBackgroundImage,
    createTerminalAnimation,
    resetEasyAnimCodeConfig,
    showIsBackUpNotification,
    createRootValStyleTemplate,
    createBackgroundOpacityStyle,
}
