from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Restaurant, Collection
from .serializers import RestaurantSerializer, CollectionSerializer

# Create your views here.
class RestaurantView(viewsets.ModelViewSet):
    #/restaurant
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer 

class CollectionView(viewsets.ModelViewSet):
    #/collection
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer 

    def retrieve(self, request, pk=None):
        collection = Collection.objects.get(pk=pk)
        listOfRestaurant = collection.restaurant.all()
        restaurants = []
        for restaurant in listOfRestaurant:
            data = RestaurantSerializer(restaurant).data
            data["value"] = restaurant.name
            data["label"] = restaurant.name
            restaurants.append(data)

        res = CollectionSerializer(collection).data
        res['detail'] = restaurants

        return Response(res)

class RestaurantByDateView(APIView):
    # /restaurantByDate?day={day}&hour={hour}&minute={minute}
    def get(self, request):
        dayKeyword = request.GET['day']
        hourKeyword = request.GET['hour']
        minuteKeyword = request.GET['minute']

        restaurants = Restaurant.objects.all()

        restaurantList = []
        for restaurant in restaurants:

            res = RestaurantSerializer(restaurant).data

            days = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun']
            detail = {}
            for day in days:
                detail[day] = {
                    'start': {
                        'hour': 0,
                        'minute': 0
                    },
                    'end': {
                        'hour': 0,
                        'minute': 0
                    }
                }

            ###### START SCHEDULE PARSING ######
            scheduleList = restaurant.schedule.split('  / ')
            for schedule in scheduleList:    
                
                scheduleDays = []
                if "," in schedule:
                    scheduleComma = schedule.split(', ')
                    scheduleSplit = scheduleComma[1].split()
                    scheduleDays.append(scheduleComma[0])
                    scheduleDays.append(scheduleSplit[0])      
                else:
                    scheduleSplit = schedule.split()
                    scheduleDays.append(scheduleSplit[0])
                    
                ########## GET DAY ##########
                dayDetail = []
                for day in scheduleDays:
                    if "-" in day:
                        daySplit = day.split('-')

                        push = False
                        for d in days:
                            if d == daySplit[0].lower():
                                push = True

                            if push:
                                dayDetail.append(d)

                            if d == daySplit[1].lower():
                                push = False
                    else:
                        dayDetail.append(day.lower())


                ########## GET START TIME ##########
                start = scheduleSplit[1]
                startDetail = scheduleSplit[2]
                
                if ":" in start:
                    splitStart = start.split(':')
                    startHour = int(splitStart[0])
                    startMinute = int(splitStart[1])
                else:
                    startHour = int(start)
                    startMinute = 0

                if startDetail == 'pm' and startHour != 12:
                    startHour = startHour + 12

                ########## GET END TIME ##########
                end = scheduleSplit[4]
                endDetail = scheduleSplit[5]
                
                if ":" in end:
                    splitEnd = end.split(':')
                    endHour = int(splitEnd[0])
                    endMinute = int(splitEnd[1])
                else:
                    endHour = int(end)
                    endMinute = 0

                if endDetail == 'pm' and endHour != 12:
                    endHour = endHour + 12
                elif endDetail == 'am' and endHour == 12:
                    endHour = 0
                    

                for dt in dayDetail:
                    detail[dt]['start']['hour'] = startHour
                    detail[dt]['start']['minute'] = startMinute
                    detail[dt]['end']['hour'] = endHour
                    detail[dt]['end']['minute'] = endMinute

            ###### END SCHEDULE PARSING ######

            res["detail"] = detail

            #Filter Here
            open = False
            if(detail[dayKeyword]["start"]["hour"] < detail[dayKeyword]["end"]["hour"]):
                if int(hourKeyword) > detail[dayKeyword]["start"]["hour"] and int(hourKeyword) < detail[dayKeyword]["end"]["hour"]:
                    open = True
                elif int(hourKeyword) == detail[dayKeyword]["start"]["hour"] and int(minuteKeyword) >= detail[dayKeyword]["start"]["minute"]:
                    open = True
                elif int(hourKeyword) == detail[dayKeyword]["end"]["hour"] and int(minuteKeyword) <= detail[dayKeyword]["end"]["minute"]:
                    open = True
                else:
                    open = False
            else:
                if int(hourKeyword) > detail[dayKeyword]["start"]["hour"]:
                    open = True
                elif int(hourKeyword) < detail[dayKeyword]["end"]["hour"]:
                    open = True
                elif int(hourKeyword) == detail[dayKeyword]["start"]["hour"] and int(minuteKeyword) >= detail[dayKeyword]["start"]["minute"]:
                    open = True
                elif int(hourKeyword) == detail[dayKeyword]["end"]["hour"] and int(minuteKeyword) <= detail[dayKeyword]["end"]["minute"]:
                    open = True
                else:
                    open = False
                

            if open:
                restaurantList.append(res)

        print(len(restaurantList))

        return Response(restaurantList)


class RestaurantByNameView(APIView):
    # /restaurantByName?keyword={keyword}
    def get(self, request):
        keyword = request.GET['keyword']

        restaurants = Restaurant.objects.filter(name__icontains=keyword)
        listRestaurant = [RestaurantSerializer(restaurant).data for restaurant in restaurants]
        
        return Response(listRestaurant)

class RestaurantOptionView(APIView):
    # /restaurantOption
    def get(self, request):
        restaurants = Restaurant.objects.all()

        restaurantList = []
        for restaurant in restaurants:
            data = RestaurantSerializer(restaurant).data
            data["value"] = restaurant.name
            data["label"] = restaurant.name
            restaurantList.append(data)
        
        return Response(restaurantList)