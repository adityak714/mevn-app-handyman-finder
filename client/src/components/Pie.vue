<template>
  <div>
    <Pie
      v-if="dataloaded"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'
import { Api } from '../Api'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

let accepted = 0
let pending = 0
let rejected = 0

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    userId: {
      type: String
    },
    isHandyman: {
      default: false
    },
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dataloaded: false,
      chartData: {
        labels: ['Accepted', 'Pending', 'Rejected'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#00D8FF', '#E46651'],
            data: [accepted, pending, rejected]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      acceptedRequests: '',
      rejectedRequests: '',
      pendingRequests: ''
    }
  },
  created() {
    console.log('Hola')
    console.log('Hola ' + this.isHandyman)
    console.log(this.userId)
    if (!this.isHandyman) {
      Api.get(`/clients/${this.userId}/requests`)
        .then((response) => {
          console.log(response)
          if (response.data.length === 0) {
            return
          }
          accepted = 0
          pending = 0
          rejected = 0

          response.data.forEach(request => {
            if (request.status === 'Rejected') {
              rejected++
            } else if (request.status === 'Pending') {
              pending++
            } else {
              accepted++
            }
          })
          this.chartData.datasets[0].data = [accepted, pending, rejected]
          this.dataloaded = true
        })
    } else {
      Api.get(`/handymen/${this.userId}/requests`)
        .then((response) => {
          console.log(response)
          if (response.data.length === 0) {
            return
          }
          accepted = 0
          pending = 0
          rejected = 0

          response.data.forEach(request => {
            if (request.status === 'Rejected') {
              rejected++
            } else if (request.status === 'Pending') {
              pending++
            } else {
              accepted++
            }
          })
          this.chartData.datasets[0].data = [accepted, pending, rejected]
          this.dataloaded = true
        })
    }
  }
}
</script>
