<template>
    <svg id="ClosingCross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
        <g>
            <g id="circle">
                <path class="cls-1" d="M15,27.67a12.5,12.5,0,1,1,12.5-12.5A12.52,12.52,0,0,1,15,27.67Z"
                      transform="translate(-2 -2.17)"/>
                <path d="M15,3.17a12,12,0,1,1-12,12,12,12,0,0,1,12-12m0-1a13,13,0,1,0,13,13,13,13,0,0,0-13-13Z"
                      transform="translate(-2 -2.17)"/>
            </g>
            <g id="line">
                <line class="cls-2" x1="8" y1="8.05" x2="18" y2="17.95"/>
            </g>
            <g id="line-2" data-name="line">
                <line class="cls-2" x1="8.02" y1="17.98" x2="17.98" y2="8.02"/>
            </g>
        </g>
    </svg>
</template>
<script>
  export default {
      name: 'ClosingCross',
      props: {

      }}
</script>
<style scoped>
    #ClosingCross .cls-1 {
        fill: transparent;
    }

    #ClosingCross .cls-2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
    }
</style>