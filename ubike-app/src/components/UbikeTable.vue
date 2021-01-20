<template>
    <tr>
          <td>{{ sno }}</td>
          <td>{{ sna }}</td>
          <td>{{ sarea }}</td>
          <td>{{ sbi }}</td>
          <td>{{ tot }}</td>
          <td>{{ mday }}</td>
    </tr>
</template>
<script>
export default {
    name:"UbikeTable",
    props:{
        sno:String,
        sna:String,
        sarea:String,
        sbi:String,
        tot:String,
        mday:String,
    }
}
</script>