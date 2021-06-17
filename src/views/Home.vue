<template>
  <div class="home">
    <hotellist />
    <kalendarfilter />
  </div>
</template>

<script>
import hotellist from '@/components/hotel-list'
import kalendarfilter from '@/components/kalendar-filter'

export default {
  name: 'Home',
  components: {
    hotellist, kalendarfilter
  }

}
</script>
