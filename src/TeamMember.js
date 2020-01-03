import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class TeamMember extends Component {
    state = {
        location: null,
        errorMessage: null
    };
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
        console.log("Fetching competition update");
        fetch("/getUserUpdate?u=ABCDE")
            .then(
                response => {
                    return response.json();
                },
                err => {
                    console.log("error", err);
                }
            )
            .then(data => {
                console.log("Downloaded Competion Update");
                console.log(data);
                if (data != undefined && data.timestamp != "0") {
                    this.setState({
                        position: data.position,
                        highestPilot: data.max_height_pilot,
                        h_highestPilot: data.max_height,
                        buddies: data.buddies,
                        gaggle: data.gaggle,
                        gaggleHighest: data.gaggle.highest
                    });
                }
            });
    }

    componentDidMount() {
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            });
        } else {
            this._getLocationAsync();
        }
        this.interval = setInterval(() => this.tick(), 3000);
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            console.log("Access is not granted.");
            this.setState({
                errorMessage: "Permission to access location was denied"
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        let text = "Waiting.." + this.state.seconds;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = "Comp assistant activated";
        }
        let position = this.state.position ? this.state.position : "NA";
        let highestPilot = this.state.highestPilot ? this.state.highestPilot : "NA";
        let h_highestPilot = this.state.h_highestPilot
            ? this.state.h_highestPilot
            : "NA";

        let buddies = this.state.buddies ? this.state.buddies : ["NA"];
        let gaggle = this.state.gaggle ? this.state.gaggle : ["NA"];

        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>{text}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Position: {position}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Highest Pilot: {highestPilot}({h_highestPilot}m)
          </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Buddies:</Text>
                    {buddies.map(item => (
                        <Text>
                            {item.pilot}({item.h}m)
            </Text>
                    ))}
                    ;
        </View>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Gaggle Size: {gaggle.size}</Text>
                    <Text style={styles.paragraph}>
                        Highest pilot in gaggle: {gaggle.highest}m
          </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: "center"
    }
});
