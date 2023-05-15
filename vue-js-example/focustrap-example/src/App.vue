<template>
<h1> Vue 3 Focus Trap Example </h1>
  <div>
    <button @click="openModal">Open Modal</button>
    <div v-if="isModalOpen" id="myElement" class="modal-overlay" @click="closeModal">
      <div class="modal-container" ref="modalContainer">
        <button @click="closeModal">Close Modal</button>
        <p>I am a div with class "modal-container"</p>
        <button>First Button</button>
        <button>Second Button</button>
        <button>Third Button</button>
        <input />
      </div>
    </div>
  </div>

  <button>After Trap</button>
</template>

<script>
 import { focusTrap } from 'magicthecat-trapfocus/index'



export default {
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      this.$nextTick(() => {
        this.$refs.modalContainer.focus();
        this.removeTrap = focusTrap(this.$refs.modalContainer);
      });
    },
    closeModal() {
      this.isModalOpen = false;
      if (this.removeTrap) {
        this.removeTrap();
      }
    },
  },
  beforeUnmount() {
    if (this.removeTrap) {
      this.removeTrap();
    }
  },
};
</script>