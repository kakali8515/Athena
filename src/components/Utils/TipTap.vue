
<template>
    <div class="vue-editor">
        <div class="vue-editor-padding vue-editor-btn-group">
            <div v-if="editor" class="flex items-center flex-wrap">
                <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    <img src="@/assets/icon/format_bold.svg" />
                    <!-- B -->
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                    I
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                    S
                </button>

                <button type="button" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                    P
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    H1
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    H2
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    H3
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    H4
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    H5
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    H6
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                    <img src="@/assets/icon/unordered_list.svg" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                    <img src="@/assets/icon/format_list_numbered.svg" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                    Blockquote
                </button>

                <button type="button" @click="editor.chain().focus().setHardBreak().run()">
                    HardBreak
                </button>
                <button type="button" @click="editor.chain().focus().undo().run()">
                    undo
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()">
                    redo
                </button>
                <div class="custom-dropdown" @click.prevent="openTable()">
                    <button type="button">
                        Table
                    </button>
                    <div :class="`dropdown-list ${dropdownOne ? 'selected' : ''}`">
                        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">insertTable</button>
                        <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">deleteTable</button>
                        <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">mergeCells</button>
                        <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">splitCell</button>
                        <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">toggleHeaderCell</button>
                        <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">mergeOrSplit</button>
                        <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">setCellAttribute</button>
                        <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">fixTables</button>
                        <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">goToNextCell</button>
                        <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">goToPreviousCell</button>
                    </div>
                </div>

                <div class="custom-dropdown" @click.prevent="openColumn()">
                    <button type="button">
                        Columns
                    </button>
                    <div :class="`dropdown-list ${dropdownColumn ? 'selected' : ''}`">
                        <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">addColumnBefore</button>
                        <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">addColumnAfter</button>
                        <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">deleteColumn</button>
                        <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">toggleHeaderColumn</button>
                    </div>
                </div>

                <div class="custom-dropdown" @click.prevent="openRow()">
                    <button type="button">
                        Rows
                    </button>
                    <div :class="`dropdown-list ${dropdownRow ? 'selected' : ''}`">
                        <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">addRowBefore</button>
                        <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">addRowAfter</button>
                        <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">deleteRow</button>
                        <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">toggleHeaderRow</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="vue-editor-padding">
            <editor-content :editor="editor" />
        </div>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            // extend the existing attributes …
            ...this.parent?.(),
            // and add a new one …
            backgroundColor: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-background-color'),
                renderHTML: (attributes) => {
                    return {
                        'data-background-color': attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor}`,
                    };
                },
            },
        };
    },
});
export default {
    components: {
        EditorContent,
    },

    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            editor: null,
            dropdownOne: false,
            dropdownColumn: false,
            dropdownRow: false,
        };
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Table.configure({
                    resizable: true,
                }),
                TableRow,
                TableHeader,
                // Default TableCell
                // TableCell,
                // Custom TableCell with backgroundColor attribute
                CustomTableCell,
            ],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML());
            },
        });
    },
    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value;
            if (isSame) {
                return;
            }
            this.editor.commands.setContent(value, false);
        },
    },

    beforeUnmount() {
        this.editor.destroy();
    },
    methods: {
        openTable() {
            this.dropdownOne = !this.dropdownOne;
            this.dropdownColumn = false;
            this.dropdownRow = false;
        },
        openColumn() {
            this.dropdownColumn = !this.dropdownColumn;
            this.dropdownOne = false;
            this.dropdownRow = false;
        },
        openRow() {
            this.dropdownRow = !this.dropdownRow;
            this.dropdownColumn = false;
            this.dropdownOne = false;
        },
    },
};
</script>

<style lang="scss">
/* Basic editor styles */

</style>
