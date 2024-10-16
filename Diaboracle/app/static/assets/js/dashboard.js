function showError(error) {
    Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error,
        error: null
    });
}

function showSuccess(success) {
    Swal.fire({
        icon: "success",
        title: "Succès",
        text: success,
        error: null
    });
}
let chartInstance = null;

function createLineChart(chartId, constante, labels, data) {
    // Récupère le contexte du canvas où le graphique sera rendu
    if (chartInstance) {
        chartInstance.destroy();
    }
    const ctx = document.getElementById(chartId).getContext('2d');
    const isMobile = window.innerWidth < 768;

    // Crée le graphique
    chartInstance = new Chart(ctx, {
        type: 'line',  // Type de graphique: line chart
        data: {
            labels: labels,  // Valeurs pour l'axe des x
            datasets: [{
                label: constante,
                data: data,  // Valeurs pour l'axe des y
                borderColor: 'rgba(75, 192, 192, 1)',  // Couleur de la ligne
                borderWidth: 2,
                fill: false  // Pas de remplissage sous la ligne
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temps',
                        font: {
                            size: isMobile ? 10 : 14  // Taille réduite pour mobile
                        }
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 8 : 12  // Taille réduite pour mobile
                        }
                    }
                },
                y: {
                    beginAtZero: true,  // L'axe des y commence à zéro
                    title: {
                        display: true,
                        text: 'Valeur',
                        font: {
                            size: isMobile ? 10 : 14  // Taille réduite pour mobile
                        }
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 8 : 12  // Taille réduite pour mobile
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,  
        }
    });
}



app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            constante: 'Poids',
            valeur: '',
            option: 0,
            start: '',
            end: '',
            mois: '',
        }
    },
    methods: {
        enregistrer(){
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            axios.get('/api/constanteAdd?constante='+this.constante+'&valeur='+this.valeur)
            .then(response => {
                if (response.data.status == 200){
                    showSuccess(response.data.message);
                }
                else{
                    showError(response.data.message);
                }
            })
        },
        createLineChart(){
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            axios.get('/api/getGrapheDatas?option='+this.option+'&constante='+this.constante+'&mois='+this.mois+'&start='+this.start+'&end='+this.end)
            .then(response => {
                if (response.data.status == 200){
                    createLineChart('graphe', this.constante, response.data.period, response.data.datas);
                }
                else{
                    showError(response.data.message);
                }
            })
        },
        getDatas(){
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            axios.get('/api/getDatas?option='+this.option+'&constante='+this.constante+'&mois='+this.mois+'&start='+this.start+'&end='+this.end)
            .then(response => {
                if (response.data.status == 200){
                    this.valeur = response.data.valeur;
                }
                else{
                    showError(response.data.message);
                }
            })
        },
        validateMonth(){
            this.createLineChart();
            document.getElementById("dismissMonthModal").click();
        },
        setMinEnd(){
            document.getElementById("end").setAttribute('min', this.start);
            document.getElementById("end").value = this.start;
        },
        validatePeriod(){
            this.createLineChart();
            document.getElementById("dismissPeriodModal").click();
        }
    },
    mounted() {
        // Exemple d'utilisation avec des valeurs fictives
        //createLineChart('graphe', 'Poids', ['Janvier', 'Février', 'Mars', 'Avril'], [65, 59, 80, 81]);
        this.createLineChart();
    },
})
if (document.getElementById("dashboard")){
    app.mount("#dashboard")
}
