const target = [];

const langList = ['ko', 'en', 'ja'];
const domainList = ['/templates', '/templates/type', '/templates/presentation', '/templates/presentation/1cmtv-검정과-회색의-심플한-대행사-홍보-우수사례-제안서'];

langList.forEach((lang) => {
    domainList.forEach((domain) => {
        target.push({ url: `https://www.miricanvas.com/${lang}${domain}`, filename: `${lang}${domain}`.replaceAll('/', '.') });
    })
})

exports.target = target;
