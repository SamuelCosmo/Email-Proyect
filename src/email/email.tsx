import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EmailProps} from '../shared/interfaces';
import LoopSvg from '../assets/loop';
import {GlobalContext} from '../../store/StoreContext';

export default function EmailPage({navigation}: any) {
  //--- STORE ---///
  const {emailList} = useContext(GlobalContext);

  //--- STATES ---///
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [emailModal, setEmailModal] = useState<EmailProps>({
    _id: '',
    created_at: '',
    email_address: '',
    full_name: '',
    message: '',
  });

  const renderItem = ({item, index}: any) => {
    const primary = index % 2 === 0;
    return (
      <View key={item._id} style={primary ? styles.row_primary : styles.row}>
        <Text style={primary ? styles.cell_primary : styles.cell}>
          {item.full_name}
        </Text>
        <Text style={primary ? styles.cell_primary : styles.cell}>
          {item.created_at ? item.created_at.split(' ')[0] : 'N/A'}
        </Text>
        <Pressable
          style={styles.cell_actions}
          onPress={() => {
            setOpenModal(value => !value);
            setEmailModal(item);
          }}>
          <LoopSvg width="24px" height="24px" />
        </Pressable>
      </View>
    );
  };

  const modalRender = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(value => !value);
        }}>
        <View style={stylesModal.modal}>
          <Pressable
            style={stylesModal.background}
            onPress={() => setOpenModal(!openModal)}></Pressable>
          <View style={stylesModal.body}>
            <View style={stylesModal.info_container}>
              <Text style={stylesModal.title}>From: </Text>
              <Text style={stylesModal.information}>
                {emailModal.full_name}
              </Text>
            </View>
            <View style={stylesModal.info_container}>
              <Text style={stylesModal.title}>Email: </Text>
              <Text style={stylesModal.information}>
                {emailModal.email_address}
              </Text>
            </View>
            <View style={stylesModal.info_container}>
              <Text style={stylesModal.information_message}>
                {emailModal.message}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      {modalRender()}
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.cell_header]}>From</Text>
          <Text style={[styles.cell, styles.cell_header]}>Received</Text>
          <Text style={styles.cell_actions}></Text>
        </View>
        {/* Data Rows */}
        {emailList.length > 0 ? (
          emailList.map((item, index) => renderItem({item, index}))
        ) : (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No emails available
          </Text>
        )}
      </View>
    </View>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  table: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  row_primary: {
    flexDirection: 'row',
    backgroundColor: '#a8b1c2',
  },
  header: {
    backgroundColor: '#078FC5',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
  },
  cell_primary: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
  },
  cell_header: {
    fontWeight: 600,
    color: 'white',
  },
  cell_actions: {
    width: 64,
    borderWidth: 1,
    borderColor: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesModal = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    backgroundColor: '#7c7c7c',
    opacity: 0.7,
    width,
    height,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 4,
    margin: 10,
    padding: 10,
    width: width - 30,
  },
  info_container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7c7c7c',
  },
  title: {
    padding: 4,
    fontWeight: 600,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#7c7c7c',
    width: 64,
  },
  information: {
    padding: 4,
    fontWeight: 600,
    textAlign: 'center',
  },
  information_message: {
    padding: 4,
    fontWeight: 400,
    textAlign: 'left',
    height: 45,
  },
  button_close: {
    borderRadius: 50,
    backgroundColor: '#7c7c7c',
    padding: 4,
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button_close_text: {
    fontWeight: 800,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
