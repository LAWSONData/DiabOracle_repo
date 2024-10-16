from django.urls import path
from app.views import *

urlpatterns = [
    path('', home, name="home"),
    path('dash', dash_home, name="dash_home"),
    path('predict_now', prediction_passant, name="prediction_passant"),
    path('predict_diabete_api', predict_diabete_api, name="predict_diabete_api"),
    path('recommandations', recommandations, name="recommandations"),
    path('recom1', recom1, name="recom1"),
    path('recom2', recom2, name="recom2"),
    path('recom3', recom3, name="recom3"),
    path('recom4', recom4, name="recom4"),
    path('recom5', recom5, name="recom5"),
    path('recom6', recom6, name="recom6"),
    path('recom7', recom7, name="recom7"),
    path('recom8', recom8, name="recom8"),
    path('recom9', recom9, name="recom9"),
    path('recom10', recom10, name="recom10"),
    path('signin', signin, name="signin"),
    path('login', login, name="login"),
    path('verif_2FA', verif_2FA, name="verif_2FA"),
    path('logout', logout, name="logout"),
    path('api/signin', api_signin, name="api_signin"),
    path('api/login', api_login, name="api_login"),
    path('profil', profile, name="profile"),
    path('api/constanteAdd', api_constanteAdd, name="api_constanteAdd"),
    path('poids', poids, name="poids"),
    path('taille', taille, name="taille"),
    path('glycemie', glycemie, name="glycemie"),
    path('gestation', gestation, name="gestation"),
    path('api/getGrapheDatas', api_getGrapheDatas, name="api_getGrapheDatas"),
    path('predictions', predictions, name="predictions"),
    path('patients', patients, name="patients"),
    path('add_patient', add_patient, name="add_patient"),
    path('delete_patient/<str:code>', delete_patient, name="delete_patient"),
    path('dash_patient/<str:code>', dash_patient, name="dash_patient"),
    path('api/getGrapheDatasPatient/<str:code>', api_getGrapheDatasPatient, name="api_getGrapheDatasPatient"),
    path('constantes_patient/<str:code>', constantes_patient, name="constantes_patient"),
    path('poids_patient/<str:code>', poids_patient, name="poids_patient"),
    path('taille_patient/<str:code>', taille_patient, name="taille_patient"),
    path('glycemie_patient/<str:code>', glycemie_patient, name="glycemie_patient"),
    path('gestation_patient/<str:code>', gestation_patient, name="gestation_patient"),
    path('predictions_patient/<str:code>', predictions_patient, name="predictions_patient"),
]