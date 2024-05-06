<template>
  <div class="modal-backdrop">
    <div :class="`modal ${width ? width : ''}`">
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header"> This is the default title! </slot>
          <div>
            <button
              type="button"
              class="btn-close"
              @click="close"
              v-if="showCloseBtn"
            >
              <img src="@/assets/icon/cross-icon.svg" alt="" />
            </button>
          </div>
        </header>

        <section class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> This is the default footer! </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showCloseBtn: Boolean,
    width: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:  rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.modal {
  background: white;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 330px;
  border-radius: 10px;
}
.modal.width-md {
  max-width: 620px;
}
.modal.width-semi-lg {
  max-width: 585px;
}

.modal-content {
  padding: 10px 0;
}

.modal-footer {
  padding: 15px;
  background-color: transparent;
  
}

.modal-header {
  position: relative;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  padding: 5px 15px;
  justify-content: space-between;
  height: auto;
  box-shadow: none;
}

.modal-body {
  position: relative;
  padding: 10px 15px;
  max-height: 325px;
  overflow-y: auto;
}

.btn-close {
  position: absolute;
  top: 4px;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
  margin: 0px;
}

</style>