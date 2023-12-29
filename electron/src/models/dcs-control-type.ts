// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/ControlType.lua

export enum ControlType {
    twoPosTwoCommandSwitchOpenClose = '2Pos_2Command_Switch_OpenClose',
    threePosTwoCommandSwitchOpenClose = '3Pos_2Command_Switch_OpenClose',
    action = 'action',
    analogDial = 'analog_dial',
    analogGauge = 'analog_gauge',
    discreteDial = 'discrete_dial',
    display = 'display',
    electricallyHeldSwitch = 'electrically_held_switch',
    emergencyParkingBrake = 'emergency_parking_brake',
    fixedStepDial = 'fixed_step_dial',
    frequency = 'frequency',
    led = 'led',
    limitedDial = 'limited_dial',
    metadata = 'metadata',
    missionComputerSwitch = 'mission_computer_switch',
    multi = 'Multi',
    radio = 'radio',
    selector = 'selector',
    toggleSwitch = 'toggle_switch',
    variableStepDial = 'variable_step_dial',
}
