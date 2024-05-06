<template>
    <div class="modal-overlap waitingcompanyapproval">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
            Calculation Criteria
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative">
          <div class="calc_wrap">
            <h4>Cursus amet tempor.</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas lectus dui viverra rhoncus neque quis eu condimentum. Mauris cras amet mauris sit mollis volutpat dictum diam, molestie. In lorem feugiat velit sapien donec. Suscipit nulla dis ultricies euismod amet, eget lectus vulputate. At rhoncus, commodo interdum eu aenean urna, et.Orci ut feugiat pellentesque phasellus euismod viverra ultrices iaculis. Mattis.</p>
            <img src="@/assets/images/Image_shape.jpg">
            <h4>Odio eget magnis a.</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, mattis id vitae lacus maecenas semper consectetur blandit. Eu placerat luctus mi sed facilisi pellentesque. Nisi, ultrices cras non arcu eget nibh eget. Sed et, lacus, at tempor. </p>
            <ul>
                <li>Ipsum morbi.</li>
                <li>Mattis turpis adipiscing.</li>
                <li>Vitae eget.</li>
                <li>Morbi.</li>
                <li>Cum vitae neque.</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac nisl consectetur hendrerit quis et sit. Dictumst senectus augue ultricies proin. Ac mauris egestas.</p>
            <ul>
                <li>Nunc tristique.</li>
                <li>Sem auctor in nec in.</li>
                <li>Nunc rutrum aliquam.</li>
                <li>Facilisi ornare semper sem.</li>
                <li>Neque commodo.</li>
            </ul>
          </div>
      </div>
       <div class=" flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
               
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'CalculationCriteria',
  
}
</script>

<style lang="scss">
   
</style>