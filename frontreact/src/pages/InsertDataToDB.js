import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import CreateEvent from '../graphql/mutation/CreateEvent'
import _ from 'lodash'

const testData = require('../json/TestData.json')

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


const InsertDataToDB = () => {

    const [createOneEvent] = useMutation(CreateEvent);

    useEffect(() => {
        testData.data.events.map(event => {
            let variables = []
            let distanceArray = []
            console.log(event.name.th)
            let unique = [...new Set(event.ticketTypes.map(ticket => ticket.price))];
            let unique2 = [...new Set(event.races.map(race => race.distance))]
            //console.log(unique)
            if (unique.length == 1) {
                variables['priceStart'] = unique[0]
            }
            else if (unique.length == 2) {
                variables['priceStart'] = unique[0]

            }
            else if (unique.length > 2) {
                variables['priceStart'] = unique[0]
                variables['priceEnd'] = unique[unique.length - 1]
            }


            unique2.sort(function (a, b) {
                return a - b
            }).map(distance => {
                distanceArray.push({ distance: distance })
            })

            variables['distance'] = distanceArray

            if (event.isVirtual == true) {
                variables['eventDateStart'] = event.settings.virtualRun.period.start
                variables['eventDateEnd'] = event.settings.virtualRun.period.end
                variables['raceType'] = "vr"
            }
            else {
                variables['eventDateStart'] = event.startDate
                variables['eventDateEnd'] = event.endDate
                variables['raceType'] = "race"
            }

            variables['organizer'] = _.get(event.organizer, "name", null)
            variables['eventNameTH'] = event.name.th
            variables['eventNameEN'] = event.name.en
            variables['eventNameTHLowerCase'] = event.name.th.toLowerCase()
            variables['eventNameENLowerCase'] = event.name.en.toLowerCase()

            variables['slug'] = event.slug
            variables['descriptionTH'] = _.get(event.description, "th", null)
            variables['descriptionEN'] = _.get(event.description, "en", null)
            variables['thumbnailPhotoUrl'] = event.thumbnailUrl
            variables['coverPhotoUrl'] = event.coverUrl
            variables['descriptionTH'] = event.contentSections[0].body.th
            variables['descriptionEN'] = event.contentSections[0].body.en
            variables['linkUrl'] = `https://race.thai.run/${event.slug}`
            variables['adminId'] = "ck6rmjnbz00210a0fhd4scorc"




            console.log(variables)

            //console.log(distanceArray)

            createOneEvent({
                variables: variables
            })
        })
    }, [])


    return (
        <div>
            insert
        </div>
    )


}

export default InsertDataToDB