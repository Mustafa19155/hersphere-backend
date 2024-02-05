import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllWorkplaces} from '../../api/workplace';
import {createJob, getAllJobs, getAllJobsOfWorkplace} from '../../api/job';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {Picker} from '@react-native-picker/picker';
import global from '../../assets/styles/global';
import {Button, TextInput} from 'react-native-paper';
import TagInput from '../../components/TextBoxWithAdd';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateJob = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [loadingWorkplaces, setloadingWorkplaces] = useState(false);
  const [loadingJobs, setloadingJobs] = useState(false);
  const [postApiCalled, setpostApiCalled] = useState(false);
  const [workplaces, setworkplaces] = useState([]);
  const [categories, setcategories] = useState([]);
  const [activeWorkplace, setactiveWorkplace] = useState(null);
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [activeCategory, setactiveCategory] = useState(null);
  const [skillset, setskillset] = useState([]);
  const [price, setprice] = useState(0);
  const [jobs, setjobs] = useState([]);

  const handleGetWorkplaces = async () => {
    try {
      setloadingWorkplaces(true);
      const data = await getAllWorkplaces();
      if (data.length > 0) {
        setworkplaces(data);
        setactiveWorkplace(data[0]);
      } else {
        toast.show('Create workplace first');
        navigation.goBack();
      }
    } catch (err) {
    } finally {
      setloadingWorkplaces(false);
    }
  };

  const handleGetWorkplaceJobs = async () => {
    if (activeWorkplace) {
      try {
        setloadingJobs(true);
        const data = await getAllJobsOfWorkplace(activeWorkplace._id);
        console.log(data);
        const workCatCopy = JSON.parse(
          JSON.stringify(activeWorkplace.categories),
        );

        data.map(job => {
          const catIndex = workCatCopy.findIndex(
            cat => cat.name == job.workplaceCategoryID,
          );
          workCatCopy[catIndex].membersCount -= 1;
        });

        setcategories(workCatCopy.filter(cat => cat.membersCount != 0));
        if (workCatCopy.filter(cat => cat.membersCount != 0).length > 0) {
          setactiveCategory(activeWorkplace.categories[0]);
        } else {
          toast.show('No categories available');
        }

        setloadingJobs(false);
      } catch (err) {
      } finally {
        setloadingJobs(false);
      }
    }
  };

  const handleCreateJob = () => {
    if (
      title &&
      description &&
      activeWorkplace &&
      activeCategory &&
      skillset.length > 0 &&
      price > 0
    ) {
      setpostApiCalled(true);
      createJob({
        workplaceID: activeWorkplace._id,
        workplaceCategoryID: activeCategory.name,
        title,
        description,
        skillset,
        price: Number(price),
      })
        .then(res => {
          setpostApiCalled(false);
          toast.show('Job posted successfully', {type: 'success'});
          navigation.goBack();
        })
        .catch(err => {
          setpostApiCalled(false);
        });
    } else {
      toast.show('Fill all fields');
    }
  };

  useEffect(() => {
    handleGetWorkplaces();
  }, []);

  useEffect(() => {
    handleGetWorkplaceJobs();
  }, [activeWorkplace]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={{gap: 10}}>
        <View style={{gap: 7}}>
          <Text style={[global.blackColor, global.textSmall]}>Job Title</Text>
          <TextInput
            placeholder="Name"
            value={title}
            onChangeText={settitle}
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={[global.gray2Back]}
            underlineColor="transparent"
            mode="outlined"
          />
        </View>
        <View style={{gap: 7}}>
          <Text style={[global.blackColor, global.textSmall]}>
            Job Description
          </Text>
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setdescription}
            outlineColor="transparent"
            multiline={true}
            numberOfLines={5}
            activeOutlineColor="transparent"
            style={[global.gray2Back]}
            underlineColor="transparent"
            mode="outlined"
          />
        </View>
        <View style={{gap: 7}}>
          <Text style={[global.blackColor, global.textSmall]}>Job Budget</Text>
          <TextInput
            placeholder="Budget"
            value={price}
            keyboardType="number-pad"
            onChangeText={setprice}
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={[global.gray2Back]}
            underlineColor="transparent"
            mode="outlined"
          />
        </View>
        <View style={{gap: 7}}>
          <Text>Workplace</Text>
          <Picker
            selectedValue={activeWorkplace}
            style={{
              height: 50,
              width: '100%',
              backgroundColor: '#EEEEEE',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setactiveWorkplace(itemValue)
            }>
            {workplaces.map(cat => (
              <Picker.Item label={cat.name} value={cat} />
            ))}
          </Picker>
        </View>
        {/* {activeWorkplace && ( */}
        <View style={{gap: 7}}>
          <Text>Select Category</Text>
          <Picker
            selectedValue={activeCategory}
            style={{
              height: 50,
              width: '100%',
              backgroundColor: '#EEEEEE',
            }}
            onValueChange={(itemValue, itemIndex) => {
              setactiveCategory(itemValue);
            }}>
            {categories.map(cat => (
              <Picker.Item label={cat.name} value={cat} />
            ))}
          </Picker>
        </View>
        {/* )} */}
        <View style={{gap: 7}}>
          <Text>skill set</Text>
          <TagInput tags={skillset} setTags={setskillset} />
        </View>
        <Button
          style={[global.greenBtn]}
          disabled={postApiCalled}
          onPress={handleCreateJob}>
          <Text style={[global.greenBtnText]}>
            {postApiCalled ? 'Loading...' : 'Post Job'}
          </Text>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateJob;

const styles = StyleSheet.create({});
