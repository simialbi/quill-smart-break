import Quill from 'quill/core/quill';
import Delta from 'quill-delta/dist/Delta';
import Module from 'quill/core/module';
import Keyboard from 'quill/modules/keyboard'
import SmartBreak from './blots/smart-break';

class SmartBreaker extends Module {
    constructor(quill, options) {
        super(quill, options);

        this.quill = quill;
        this.options = options;

        this.quill.register(SmartBreak);
        this.quill.keyboard.addBinding({
            key: Keyboard.keys.ENTER,
            shiftKey: true
        }, function (range) {
            let currentLeaf = this.quill.getLeaf(range.index)[0]
            let nextLeaf = this.quill.getLeaf(range.index + 1)[0]

            this.quill.insertEmbed(range.index, 'break', true, 'user');

            // Insert a second break if:
            // At the end of the editor, OR next leaf has a different parent (<p>)
            if (nextLeaf === null || (currentLeaf.parent !== nextLeaf.parent)) {
                this.quill.insertEmbed(range.index, 'break', true, 'user');
            }

            // Now that we've inserted a line break, move the cursor forward
            this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        });
        this.quill.clipboard.addMatcher('BR', function () {
            let newDelta = new Delta();
            newDelta.insert({'break': ''});
            return newDelta;
        });

        let length = this.quill.getLength();
        let text = this.quill.getText(length - 2, 2);
        if (text === '\n\n') {
            this.quill.deleteText(quill.getLength() - 2, 2);
        }
    }
}

export default SmartBreaker;