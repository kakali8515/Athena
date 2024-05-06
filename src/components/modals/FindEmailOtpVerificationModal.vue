<template>
  <div class="modal-overlap waitingcompanyapproval">
    <div
      class="
        modal-dialog modal-dialog-centered
        relative
        w-auto
        pointer-events-none
      "
    >
      <div
        class="
          modal-content
          border-none
          shadow-lg
          relative
          flex flex-col
          w-full
          pointer-events-auto
          bg-white bg-clip-padding
          rounded-md
          outline-none
          text-current
        "
      >
        <div
          class="
            modal-header
            flex flex-shrink-0
            items-center
            justify-between
            p-4
            rounded-t-md
          "
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            {{ headingText }}
          </h5>
          <button
            type="button"
            class="
              btn-close
              box-content
              w-4
              h-4
              p-1
              text-black
              border-none
              rounded-none
              opacity-50
              focus:shadow-none focus:outline-none focus:opacity-100
              hover:text-black hover:opacity-75 hover:no-underline
            "
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="close"
          ></button>
        </div>
        <div class="modal-body relative">
          <div class="cancel_info_wrap">
            <p>{{ bodytext }}</p>
          </div>
        </div>
        <div
          class="
            modal-footer
            flex flex-shrink-0
            items-center
            justify-center
            p-4
            rounded-b-md
          "
        >
          <button
            type="button"
            v-if="btn1"
            @click="gotoLink1(link1)"
            class="
             graysolid w-full px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out
            "
          >
            {{ btn1 }}
          </button>
          <button
            type="button"
            v-if="btn2"
            @click="gotoLink2(link2)"
            class="
              solid
              graysolid
              full_button
              w-full
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
          >
            {{ btn2 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindEmailOtpVerificationModal",
  props: ["link1", "bodytext", "headingText", "link2", "btn1", "btn2"],
  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    },
    gotoLink1(link1) {
      this.$router.push(link1);
      this.$emit("close");
    },
    gotoLink2(link2) {
      this.$router.push(link2);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
</style>