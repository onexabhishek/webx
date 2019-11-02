let root = 'panelx/public';
const siteUrl = (extendsTo) => {
    let extds = (extendsTo) ? '/'+extendsTo : '/';
    let base_url = window.location.protocol + '//' + window.location.hostname + '/'+root+extds;
return base_url;
}