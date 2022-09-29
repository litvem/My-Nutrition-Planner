<template>
    <b-container class="layout">
        <b-row class="text-center">
            <b-col align-self="stretch">
                <br><h1>Weekly caledar</h1><br>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="text-center">
                <h4>Monday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Tuesday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Wednesday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Thursday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Friday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Saturday</h4>
            </b-col>
            <b-col class="text-center">
                <h4>Sunday</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
            <b-col>
              <b-jumbotron>
                <b-button pill variant="outline-secondary">+</b-button>
              </b-jumbotron>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>
    h1 {
        color: #210b85
    }
    .jumbotron {
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: top;
  }
</style>
