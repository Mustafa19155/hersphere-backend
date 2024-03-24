import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, Modal, TextInput} from 'react-native-paper';
import global from '../../assets/styles/global';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {createWorkplace} from '../../api/workplace';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';

const CreateWorkplace = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [teamName, setteamName] = useState('');
  const [description, setdescription] = useState('');
  const [noOfEmployees, setnoOfEmployees] = useState(0);
  const [noOfDays, setnoOfDays] = useState(0);
  const [currentStep, setcurrentStep] = useState(1);
  const [categories, setcategories] = useState([]);
  const [showCategoryModal, setshowCategoryModal] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);
  const [imageUri, setimageUri] = useState(null);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setimageUri(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    try {
      if (currentStep == 1) {
        if (teamName && description && noOfEmployees && noOfDays && imageUri) {
          setcurrentStep(currentStep + 1);
        } else {
          toast.show('Fill all fields');
        }
      } else {
        if (
          categories.reduce((acc, cur) => acc + cur.membersCount, 0) !=
          noOfEmployees
        ) {
          toast.show('All employees must be in atleast one category');
        } else {
          setapiCalled(true);

          const res = await fetch(imageUri);
          const blob = await res.blob();

          const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

          const mainRef = ref(storage, `workplace-images/${filename}`);

          await uploadBytes(mainRef, blob);

          const downloadimg = await getDownloadURL(mainRef);

          createWorkplace({
            name: teamName,
            description,
            endDate: moment().add(noOfDays, 'days').toDate(),
            totalMembers: noOfEmployees,
            categories,
            image: downloadimg,
          })
            .then(res => {
              toast.show('Workplace created', {type: 'success'});
              navigation.goBack();
              setapiCalled(false);
            })
            .catch(err => {
              toast.show(err.response.data);
              setapiCalled(false);
            });
        }
      }
    } catch (err) {}
  };

  //   useEffect(() => {
  //     navigation.getParent()?.getParent()?.setOptions({headerShown: false});
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: {display: 'none'},
  //       tabBarVisible: false,
  //     });

  //     return () => {
  //       navigation.getParent()?.getParent().setOptions({headerShown: true});
  //       navigation.getParent()?.setOptions({
  //         tabBarStyle: {
  //           backgroundColor: 'white',
  //           elevation: 0,
  //           borderColor: 'white',
  //         },
  //         tabBarVisible: true,
  //       });
  //     };
  //   }, [navigation]);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <CategoryModal
        open={showCategoryModal}
        setopen={setshowCategoryModal}
        categories={categories}
        setcategories={setcategories}
        totalEmpoyees={noOfEmployees}
      />
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height - 25,
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 10,
          padding: 15,
        }}>
        {currentStep == 1 ? (
          <View style={{gap: 20}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {imageUri ? (
                <TouchableOpacity onPress={selectImage}>
                  <Image source={{uri: imageUri}} style={styles.image} />
                </TouchableOpacity>
              ) : (
                <View style={styles.imgPlaceholder}>
                  <EntypoIcons
                    name="network"
                    onPress={selectImage}
                    size={124}
                  />
                </View>
              )}
            </View>
            <View style={{gap: 7}}>
              <Text style={[global.blackColor, global.textSmall]}>
                Team Name
              </Text>
              <TextInput
                placeholder="Name"
                value={teamName}
                onChangeText={setteamName}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                style={[global.gray2Back]}
                underlineColor="transparent"
                mode="outlined"
              />
            </View>
            <View style={{gap: 7}}>
              <Text style={[global.blackColor, global.textSmall]}>
                Team Description
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
              <Text style={[global.blackColor, global.textSmall]}>
                Number of Employees
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholder="no of employees"
                value={noOfEmployees}
                onChangeText={setnoOfEmployees}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                style={[global.gray2Back]}
                underlineColor="transparent"
                mode="outlined"
              />
            </View>
            <View style={{gap: 7}}>
              <Text style={[global.blackColor, global.textSmall]}>
                Number of days
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholder="no of days"
                value={noOfDays}
                onChangeText={setnoOfDays}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                style={[global.gray2Back]}
                underlineColor="transparent"
                mode="outlined"
              />
            </View>
          </View>
        ) : (
          <View>
            <Button
              style={[global.greenBtnSm, {width: 180, alignSelf: 'flex-end'}]}
              onPress={() => setshowCategoryModal(true)}>
              <Text style={global.greenBtnTextSm}>Add Category</Text>
            </Button>
            <View>
              {categories.map(cat => (
                <View>
                  <Text>{cat.name}</Text>
                  <Text>{cat.membersCount}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <Button
          style={[global.greenBtn]}
          onPress={handleContinue}
          disabled={apiCalled}>
          <Text style={global.greenBtnText}>
            {apiCalled
              ? 'Loading...'
              : currentStep == 1
              ? 'Continue'
              : 'Create Workplace'}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateWorkplace;

const CategoryModal = ({
  open,
  setopen,
  categories,
  setcategories,
  totalEmpoyees,
}) => {
  const [name, setname] = useState('');
  const [noOfEmployees, setnoOfEmployees] = useState(0);

  const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  };

  return (
    <Modal
      contentContainerStyle={containerStyle}
      visible={open}
      onDismiss={() => setopen(false)}>
      <View style={{gap: 20}}>
        <View style={{gap: 7}}>
          <Text style={[global.blackColor, global.textSmall]}>
            Category Name
          </Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setname}
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={[global.gray2Back]}
            underlineColor="transparent"
            mode="outlined"
          />
        </View>
        <View style={{gap: 7}}>
          <Text style={[global.blackColor, global.textSmall]}>
            Number of employees
          </Text>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'stretch'}}>
            <TouchableOpacity
              onPress={() => {
                if (noOfEmployees > 0) setnoOfEmployees(noOfEmployees - 1);
              }}>
              <Text style={[global.textLarge]}>-</Text>
            </TouchableOpacity>
            <View
              style={[
                global.gray2Back,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                },
              ]}>
              <Text
                value={noOfEmployees}
                style={[
                  {
                    textAlign: 'center',
                    width: 80,
                    borderRadius: 5,
                  },
                ]}>
                {noOfEmployees}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (
                  categories.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.membersCount,
                    0,
                  ) +
                    noOfEmployees <
                  totalEmpoyees
                )
                  setnoOfEmployees(noOfEmployees + 1);
              }}>
              <Text style={[global.textLarge]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          style={[global.greenBtnSm, {width: '100%', alignSelf: 'center'}]}
          onPress={() => {
            if (name && noOfEmployees > 0) {
              setopen(false);
              setcategories([
                ...categories,
                {name, membersCount: noOfEmployees},
              ]);
              setname('');
              setnoOfEmployees(0);
            }
          }}>
          <Text style={global.greenBtnTextSm}>Add</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 124,
    height: 124,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
