import tags from './tags.js';
import Category from './Category.js';

// parse the tags into a tag tree object
class TagTree {
    constructor(tags) {
        this.categories = {};
        this.tags = {};
        this.lastCategory = null;
        this.selectedTags = {};
        this.tagArray = [];

        this.parseTags(tags);
        this.categoryListener();
        this.tagListener();
        this.copyListener();
    }
    parseTags(tags) {
        let lines = tags.split('\n');
        for(let x=0; x<lines.length; x++) {
            let line = lines[x];
            if(line == '') continue;
            if(line.slice(-1) == ':') {
                this.addCategory(line.slice(0,-1));
            }
            else {
                let parts = line.split(' ');
                this.addTag(this.lastCategory, parts[0],parts[1]);
            }
        }
    }
    addCategory(name) {
        this.lastCategory = name;
        this.categories[name] = new Category(name);
    }
    addTag(category, name, count) {
        this.categories[category].addTag(name, count);
    }
    categoryListener() {
        Object.keys(this.categories).forEach(name=>{
            let cat = this.categories[name];
            cat.checkbox.addEventListener('click', ()=> {
                if(cat.checkbox.checked) {
                    cat.markTags();
                }
                else cat.unmarkTags();
                this.updateSelectedTags();
            });
        });
    }
    tagListener() {
        Object.keys(this.categories).forEach(name=>{
            let cat = this.categories[name];
            for(let x=0; x<cat.tagElements.length; x++) {
                let tag = cat.tagElements[x];
                tag.checkbox.addEventListener('click', ()=>{
                    this.updateSelectedTags();
                });
                tag.container.addEventListener('click', ()=>{
                    console.log(tag.name);
                    if(tag.checkbox.checked) {
                        tag.checkbox.checked = false;
                    }
                    else tag.checkbox.checked =true;
                    this.updateSelectedTags();
                });
            }
        });
    }
    copyListener() {
        treeFooter.addEventListener('click', ()=> {
            selectText('treeFooter');
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            //copyToolTip.innerHTML = `Copied ${this.limit} tags:<br>${treeFooter.textContent}`;
            copyToolTip.innerHTML = `${treeFooter.textContent} <br><br>${this.limit} tags copied to clipboard`;
            copyToolTip.style.display = 'inline-block';
            darkOverlay.style.display = 'inline-block';
        });
        darkOverlay.addEventListener('click', ()=>{
            copyToolTip.style.display = 'none';
            darkOverlay.style.display = 'none';
        });
        copyToolTip.addEventListener('click', ()=>{
            copyToolTip.style.display = 'none';
            darkOverlay.style.display = 'none';
        });
    }
    updateSelectedTags() {
        this.selectedTags = {};
        Object.keys(this.categories).forEach(name=>{
            let cat = this.categories[name];
            for(let x=0; x<cat.tagElements.length; x++) {
                let tag = cat.tagElements[x];
                if(tag.checkbox.checked) {
                    tag.container.style.backgroundColor = tag.selectedColor;
                    this.selectedTags[tag.name] = true;
                    this.selectedTagCount++;
                }
                else tag.container.style.backgroundColor = tag.unselectedColor;
            }
        });
        // this is separate to make it so duplicates are okay in categories
        this.selectedTagCount = 0;
        this.tagArray = [];
        Object.keys(this.selectedTags).forEach(name=>{
            this.tagArray.push(name);
            this.selectedTagCount++;
        });

        this.generateTagOutput();
        treeHeader.textContent = `Tags Selected: ${this.selectedTagCount}`;
    }
    generateTagOutput() {
        let outputArray = [];
        let outputString = '';
        let inputArray = this.tagArray.slice(0);
        let limit = 30;
        this.limit = 30;
        if(inputArray.length < 30) {
            limit = inputArray.length;
            this.limit = limit;
        }
        for(let x=0, depth, lookup; x<limit; x++) {
            depth = limit - x - 1;
            lookup = getRandomInt(0,depth);
            outputArray.push(inputArray[lookup]);
            inputArray.splice(lookup,1);
        }
        outputString = outputArray.join(' ');
        treeFooter.textContent = outputString;
        treeFooter.value = outputString;
    }
}

// export a single instance
export default new TagTree(tags);


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectText(containerid) {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
}
function unselectText() {
    window.getSelection().removeAllRanges();
}