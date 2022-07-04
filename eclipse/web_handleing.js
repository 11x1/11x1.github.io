const header = document.getElementsByClassName('header')[0]
const header_logo = document.getElementsByClassName('pill')[0]
const arrows_div = document.getElementsByClassName('arrows-down')[0]
const footer = document.getElementsByClassName('footer')[0]

header_logo.addEventListener('mousedown', () => window.location.href = 'https://discord.gg/desync')
arrows_div.addEventListener('mousedown', () => footer.scrollIntoView({behavior: "smooth"}))
const update_body_padding = () => {
    document.body.style.paddingTop = header.offsetHeight + header.offsetHeight/10 + 'px'
}
onload = update_body_padding
onresize = update_body_padding