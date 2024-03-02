import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getJobById} from '../../api/job';
import global from '../../assets/styles/global';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {createJobRequest} from '../../api/jobRequests';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import SuccessModal from '../../components/SuccessModal';

const CreateJobRequest = ({route}) => {
  const navigation = useNavigation();

  const [job, setjob] = useState(null);
  const [loading, setloading] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);
  const [successModalOpen, setsuccessModalOpen] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const {jobID} = route.params;
    setloading(false);
    getJobById(jobID)
      .then(res => {
        setjob(res);
        setloading(false);
      })
      .catch(err => {
        setloading(false);
      });
  }, []);

  const showRemTime = date => {
    const now = moment();
    const end = moment(date);
    const duration = moment.duration(end.diff(now));

    if (duration.asDays() > 30) {
      // Display months
      return `${Math.floor(duration.asMonths())} Month${
        Math.floor(duration.asMonths()) > 1 ? 's' : ''
      }`;
    } else {
      // Display days
      const days = `${duration.days()} Day${duration.days() > 1 ? 's' : ''}`;
      return days;
    }
  };

  const handleApply = () => {
    setapiCalled(true);
    createJobRequest({jobID: job._id}).then(res => {
      setapiCalled(false);
      // toast.show('Applied successfully', {type: 'success'});
      setsuccessModalOpen(true);
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <SuccessModal
          open={successModalOpen}
          setopen={setsuccessModalOpen}
          text={'Your Job Request has been sent Successfully'}
        />
        {job && (
          <View
            style={{
              height: Dimensions.get('window').height - 100,
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 12}}>
                  {job.workplaceID.image ? (
                    <Image
                      source={{
                        uri: job.workplaceID.image,
                      }}
                      style={{width: 60, height: 60, borderRadius: 50}}
                    />
                  ) : (
                    <Image style={{width: 60, height: 60, borderRadius: 50}} />
                  )}
                  <View>
                    <Text style={[global.textMedium]}>{job.title}</Text>
                    <Text>{job.workplaceID.name}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="dashboard" size={24} color="black" />

                  <Text style={[global.textSmall, global.grayColor]}>
                    {job.workplaceCategoryID}
                  </Text>
                </View>
                {job.skillset.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcons name="tasks" size={24} color="black" />
                    <Text style={[global.textSmall, global.grayColor]}>
                      {job.skillset[0]}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <AntDesignIcons name="wallet" size={24} color="black" />
                  <Text style={[global.textSmall, global.grayColor]}>
                    ${job.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  elevation: 3,
                  backgroundColor: 'white',
                  height: 1,
                  width: '100%',
                }}></View>

              <View style={{padding: 15, gap: 15}}>
                <View style={{gap: 5}}>
                  <Text style={[global.textNormal, global.fontBold]}>
                    Job Description
                  </Text>
                  <Text>{job.description}</Text>
                </View>

                <View style={{gap: 5}}>
                  <Text style={[global.textNormal, global.fontBold]}>
                    Skills Required
                  </Text>
                  <View style={{flexDirection: 'row', gap: 15}}>
                    {job.skillset.map((skill, index) => (
                      <View
                        style={[
                          global.greenBack,
                          {
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                          },
                        ]}>
                        <Text key={index} style={{color: 'white'}}>
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{gap: 5}}>
                  <Text style={[global.textNormal, global.fontBold]}>
                    Team Name
                  </Text>
                  <Text>{job.workplaceID.name}</Text>
                </View>
                <View style={{gap: 5}}>
                  <Text style={[global.textNormal, global.fontBold]}>
                    Work Duration
                  </Text>
                  <Text>{showRemTime(job?.workplaceID?.endDate)}</Text>
                </View>
              </View>
            </View>
            <View style={{padding: 15}}>
              <Button
                style={[
                  !job.hasApplied ? global.greenBtn : global.disabledBtn,
                  {borderRadius: 8},
                ]}
                onPress={handleApply}
                disabled={job.hasApplied || apiCalled}>
                <Text style={[global.greenBtnText]}>
                  {job.hasApplied
                    ? 'Already Applied'
                    : apiCalled
                    ? 'Loading...'
                    : 'Apply for this Job'}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CreateJobRequest;

const styles = StyleSheet.create({});
