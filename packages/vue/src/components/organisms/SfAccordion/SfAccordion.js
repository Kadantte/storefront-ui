import Vue from "vue";
import SfAccordionItem from "./_internal/SfAccordionItem.vue";

Vue.component("SfAccordionItem", SfAccordionItem);

export default {
  name: "SfAccordion",
  props: {
    /**
     * Allows to open multiple accordion items if set to "true"
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Opens the first accordion item if set to "true"
     */
    firstOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Array of items to populate the default markup
     */
    items: {
      type: Array,
      default: []
    },
    /**
     * Allows to use two different markups for opened and closed header
     */
    openHeaderStyle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle(slotId) {
      if (!this.multiple) {
        this.$children.forEach(child => {
          child._uid === slotId
            ? (child.isOpen = !child.isOpen)
            : (child.isOpen = false);
        });
      } else {
        const clickedHeader = this.$children.find(child => {
          return child._uid === slotId;
        });
        clickedHeader.isOpen = !clickedHeader.isOpen;
      }
    },
    openFirst() {
      this.firstOpen ? (this.$children[0].isOpen = true) : "";
    }
  },
  mounted: function() {
    this.$on("toggle", this.toggle);
    this.openFirst();
  }
};
