import React from 'react'
import {StyleSheet, View} from 'react-native'

export const AppCard = props => (
    <View style={{...styles.default, ...props.style}}>{props.children}</View>
)

const styles = StyleSheet.create({
    'default': {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        shadowColor: 'black',
        shadowRadius:2,
        shadowOpacity: 0.3,
        shadowOffset: {width:2, height: 3},
        backgroundColor: 'white',
        borderRadius:10,
        // для android тень
        elevation: 8
    }
})