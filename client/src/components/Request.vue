<template>
    <div class = "row card-content">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <div class = "col-2 left-card">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="card-image rounded-0"></b-card-img>
            </div>
        <div class = "col-10 right-card">
            <div class = "col-6 request-information">
              <div class = "handyman-name">
                <strong>Date: {{request.date}}</strong>
              </div>
              <div class = "handyman-profession">
                <strong>Address: {{request.address}}</strong>
              </div>
              <div class = "handyman-profession">
                <strong>Description: {{request.description}}</strong>
              </div>
            </div>
            <div class = "col-6 create-request-button">
                <b-button  variant="outline-primary">Edit request</b-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Request',
  props: {
    request: Object
  }
}
</script>
<style scoped>
.left-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.right-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.request-information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Open Sans", sans-serif;
}
.card-image {
  height: 80px;
  width: 80px;
  border-radius: 30px;
}
.card-content {
    height: 100%;
}
</style>
