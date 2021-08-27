export default class Tag {
    constructor(name, count) {
        this.name = name;
        this.count = count;
        this.unselectedColor = '#eee';
        this.selectedColor = '#aef';
        this.container = document.createElement('div');
        this.container.classList.add('tagElementContainer');

        this.nameElement = document.createElement('div');
        this.nameElement.classList.add('tagElementName');
        this.nameElement.textContent = this.name;

        this.countElement = document.createElement('div');
        this.countElement.classList.add('tagElementCount');
        this.countElement.textContent = this.count;

        this.checkbox = document.createElement('input');
        this.checkbox.classList.add('tagElementCheckbox');
        this.checkbox.type = 'checkbox';
        this.checkbox.checked = false;

        this.container.appendChild(this.nameElement);
        this.container.appendChild(this.countElement);
        this.container.appendChild(this.checkbox);
    }
}
/*
checkbox state does need to be monitored to keep track of total selected tags
*/