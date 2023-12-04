(function () {

    document.querySelectorAll('[data-js-clip-content]')
        .forEach(parent => {
            parent.querySelectorAll('[data-js-clip]')
                .forEach(element => {
                    if (element.dataset?.jsClip) {
                        element.addEventListener('click', () => {
                            const tag = element.dataset?.jsClip;
                            const contentUrl =
                                `${window.location.origin}${window.location.pathname}#${tag}`
                            copyContent(contentUrl)
                                .then(()=> {
                                    let text = 'Sharing URL sent to clipboard!';
                                    if (parent.dataset?.jsClipToast) {
                                        text = parent.dataset?.jsClipToast;
                                    }
                                    window.location.replace(contentUrl);
                                    spawnToast(text, true);
                                })
                                .catch(() => {
                                    spawnToast('Ops, something went wrong..', false);
                                });

                        });
                    }
                });
        });


    async function copyContent(content) {
        return await navigator.clipboard.writeText(content);
    }

    function spawnToast(text, ok = true, timeout = 2000) {
        const div = document.createElement('div')
        div.className = 'toast ' + (ok ? '-success' : '-error');

        const i = document.createElement('i');
        i.className = 'bi bi-clipboard-check-fill';
        i.style.marginRight = '5px';
        div.appendChild(i);

        div.innerHTML = div.innerHTML + text;

        setTimeout(function(){
            div.remove()
        }, timeout);
        document.body.appendChild(div);
    }
})();