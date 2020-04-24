import Quill from 'quill';

const Embed = Quill.import('blots/embed');
const Break = Quill.import('blots/break');

class SmartBreak extends Break {
    length() {
        return 1;
    }

    value() {
        return '\n';
    }

    insertInto(parent, ref) {
        Embed.prototype.insertInto.call(this, parent, ref);
    }
}

SmartBreak.blotName = 'break';
SmartBreak.tagName = 'BR';

export default SmartBreak;