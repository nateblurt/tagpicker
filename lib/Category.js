import Tag from './Tag.js';

export default class Category {
    constructor(name) {
        this.tagCount = 0;
        this.tagElements = [];
        this.details = document.createElement('details');
        this.summary = document.createElement('summary');

        this.name = document.createElement('div');
        this.name.classList.add('categoryName');
        this.name.textContent = name;

        this.count = document.createElement('div');
        this.count.classList.add('categoryCount');
        this.count.textContent = '0';

        this.checkbox = document.createElement('input');
        this.checkbox.classList.add('categoryCheckbox');
        this.checkbox.type = 'checkbox';

        this.details.appendChild(this.summary);
        this.summary.appendChild(this.name);
        this.summary.appendChild(this.count);
        this.summary.appendChild(this.checkbox);
        treeContainer.appendChild(this.details);
        this.details.appendChild(this.summary);
    }
    addTag(name, count) {
        this.tagCount++;
        this.count.textContent = this.tagCount + '';

        let tag = new Tag(name, count);
        this.details.appendChild(tag.container);
        this.tagElements.push(tag);
    }
    markTags() {
        for(let x=0; x< this.tagElements.length; x++) {
            this.tagElements[x].checkbox.checked = true;
        }
    }
    unmarkTags() {
        for(let x=0; x< this.tagElements.length; x++) {
            this.tagElements[x].checkbox.checked = false;
        }
    }
}