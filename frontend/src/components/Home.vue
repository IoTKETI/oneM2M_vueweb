<template>
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">
      <img src="../../public/keti-logo.png" height="30" class="d-inline-block align-top" alt="Kitten">
      oneM2M-Vue Application
    </b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/crs">Create Resource</b-nav-item>
        <b-nav-item href="/reis">Retrieve Resource</b-nav-item>
        <b-nav-item href="/notis" >Notification Resource</b-nav-item>
        <b-nav-item href="/mtoverws" >Monitoring Resource</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>

export default {
    name: "Home"
};
</script>
