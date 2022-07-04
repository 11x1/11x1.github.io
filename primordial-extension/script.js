const name_to_id = {
    'main': 'main',
    'desc': 'description',
    'other': 'about'
};

const tabs_selectors = document.getElementById('tabs');
const main_div = document.getElementById('main');
const desc_div = document.getElementById('description');
const other_div = document.getElementById('about');

for (const tab of tabs_selectors.children) {
    tab.addEventListener('click', function() {
        const id = name_to_id[tab.attributes.name.value];

        tabs_selectors.children[0].className = '';
        tabs_selectors.children[1].className = '';
        tabs_selectors.children[2].className = '';
        tab.className = 'selected';

        main_div.style.display = 'none';
        desc_div.style.display = 'none';
        other_div.style.display = 'none';

        document.getElementById(id).style.display = 'block';
    });
}

desc_div.style.display = 'none';
other_div.style.display = 'none';