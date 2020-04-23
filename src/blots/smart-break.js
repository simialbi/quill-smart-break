import Break from 'quill/blots/break';
import Embed from 'quill/blots/embed';

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