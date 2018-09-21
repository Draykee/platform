import { Component } from 'src/core/shopware';
import template from './sw-media-grid-media-item.html.twig';
import './sw-media-grid-media-item.less';
import domUtils from '../../../../core/service/utils/dom.utils';

Component.register('sw-media-grid-media-item', {
    template,

    props: {
        item: {
            required: true,
            type: Object,
            validator(value) {
                return value.type === 'media';
            }
        },

        showSelectionIndicator: {
            required: true,
            type: Boolean
        },

        selected: {
            type: Boolean,
            required: true
        },

        isList: {
            type: Boolean,
            required: false,
            default: false
        },

        showContextMenuButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    data() {
        return {
            showModalReplace: false,
            showModalDelete: false
        };
    },

    computed: {
        mediaPreviewClasses() {
            return {
                'is--highlighted': this.selected && this.showSelectionIndicator
            };
        },

        selectedIndicatorClasses() {
            return {
                'selected-indicator--visible': this.showSelectionIndicator
            };
        }
    },

    methods: {
        handleGridItemClick({ originalDomEvent }) {
            if (this.isSelectedIndicatorClicked(originalDomEvent.composedPath())) {
                return;
            }

            this.$emit('sw-media-grid-item-clicked', {
                originalDomEvent,
                item: this.item
            });
        },

        isSelectedIndicatorClicked(path) {
            return path.some((parent) => {
                return parent.classList && parent.classList.contains('sw-media-grid-media-item__selected-indicator');
            });
        },

        doSelectItem(originalDomEvent) {
            if (!this.selected) {
                this.selectItem(originalDomEvent);
                return;
            }

            this.removeFromSelection(originalDomEvent);
        },

        selectItem(originalDomEvent) {
            this.$emit('sw-media-grid-item-selection-add', {
                originalDomEvent,
                item: this.item
            });
        },

        removeFromSelection(originalDomEvent) {
            this.$emit('sw-media-grid-item-selection-remove', {
                originalDomEvent,
                item: this.item
            });
        },

        emitPlayEvent(originalDomEvent) {
            if (!this.selected) {
                this.$emit('sw-media-grid-item-play', {
                    originalDomEvent,
                    item: this.item
                });
                return;
            }

            this.removeFromSelection(originalDomEvent);
        },

        showItemDetails(originalDomEvent) {
            this.$emit('sw-media-grid-media-item-show-details', {
                originalDomEvent,
                item: this.item
            });
        },

        copyItemLink() {
            domUtils.copyToClipboard(this.item.url);
        },

        openModalDelete() {
            this.showModalDelete = true;
        },

        closeModalDelete() {
            this.showModalDelete = false;
        },

        emitItemDeleted(deletePromise) {
            this.closeModalDelete();
            deletePromise.then(() => {
                this.$emit('sw-media-grid-media-item-delete');
            });
        },

        openModalReplace() {
            this.showModalReplace = true;
        },

        closeModalReplace() {
            this.showModalReplace = false;
        }
    }
});
