const wrapper = document.querySelector('#df-btn')
const config = {
    project: wrapper.getAttribute('project'),
    width: wrapper.getAttribute('width'),
    height: wrapper.getAttribute('height'),
    openText: wrapper.getAttribute('openText'),
    closeText: wrapper.getAttribute('closeText'),
    logo: wrapper.getAttribute('logo'),
    logoDark: wrapper.getAttribute('logoDark')
}

if (!config.project){
    console.warn('Please specify your project ID in attributes!')
}

else {
    const style = document.createElement('style')
    style.innerHTML = `
    .df-btn {
        padding: 0;
        border: none;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
        font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        border-radius: 24px;
        cursor: pointer;
        transition: all .08s linear;
        position: fixed;
        bottom: 15px;
        right: 0px;
        margin: 16px;
        display: flex;
        flex-direction: column;
        z-index: 999
    }

    .df-btn-text {
        min-width: 60px;
        color: #3c4043;
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        letter-spacing: 2.25px;
        transition: all .08s linear;
        font-size: .875rem;
        height: 30px;
        border-radius: 15px 0px;
    }

    .df-btn-text:before {
        width: 60px;
        height: 60px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 35px;
        background-image: url(assets/chat.svg);
        background-color: #f44336;
        content: '';
        border-radius: 50px;
    }

    .df-btn:hover {
        box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)
    }

    .df-btn:not(.df-closed){
        border-radius: 16px
    }

    .df-btn:not(.df-closed) > .df-btn-text:before {
        background-size: 24px;        
        background-image: url('assets/close.svg');
        width: 370px;
        background-color: #f44336;
        background-position: right, left;
        content: 'Evosys Buddy';
        justify-content: left;
        font-size: 17px;
        padding-top: 12px;
        border-radius: 15px 15px 0px 0px;
        color: white;
    }

    .df-btn-content {
        display: block;
        border: 0;
        height: ${config.height || '500px'};
        width: ${config.width || '320px'};
        transition: all .25s ease;
        float: right;
        opacity: 1
    }

    .df-btn:not(.df-closed) > .df-btn-content {
        padding-bottom: 9px;
    }

    .df-closed > .df-btn-content {
        width: 0;
        height: 0;
        opacity: 0
    }

    .oda-chat-logo {
        flex: 0;
        height: 24px;
        max-height: 32px;
        max-width: 32px;
        min-height: 16px;
        width: 24px;
    }
    @media screen and (max-width: 720px){
        .df-btn {
            border-radius: 28px;
        }

        .df-btn:not(.df-closed) {
            margin: 0px;
            border-radius: 0px
        }

        .df-btn:not(.df-closed) > .df-btn-content {
            width: 100vw;
            height: calc(100vh - 56px);
            padding-bottom: 0px
        }

        .df-btn-text {
            padding: 0;
            height: 56px;
            font-size: 0;
        }
    }

    @media (prefers-color-scheme: dark){
        .df-btn {
            background-color: #202124
        }

        .df-btn-text {
            color: white
        }

        .df-btn-text:before {
            background-image: url('${config.logoDark || 'assets/logo_dark.svg'}')
        }

        .df-btn:not(.df-closed) > .df-btn-text:before {
            background-image: url('assets/close_dark.svg')
        }
    }`
    // ${config.openText || 'Chat'}
    document.head.appendChild(style)
    document.write(`
        <button class="df-btn df-closed" onclick="dfToggle()">
        <div class="df-btn-text">
        </div>
            <iframe class="df-btn-content" src="https://frontend-dot-service-desk-chatbot-dev.el.r.appspot.com/" allow="microphone *"></iframe>
        </button>
    `)

    let dfToggled = false
    window.dfToggle = () => {
        document.querySelector('.df-btn').classList = dfToggled ? 'df-btn df-closed' : 'df-btn'
        // document.querySelector('.df-btn-text').innerText = dfToggled ? '' : (config.closeText || 'Close')
        dfToggled = !dfToggled        
    }
}
