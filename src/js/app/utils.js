import { TEMPLATE_NAMES } from './consts';

export function isValidToSave(params) {
    const {
        gender,
        typeOfPhoto,
        age,
        wearBiceps,
        wearChest,
        wearUnderChest,
        wearWaist,
        wearHips,
        wearLowHips,
        wearThigh,
        wearKnee,
        wearCalf,
        wearAnkle,
        numberOfPoints,
        type,
    } = params;

    const firstConditionPart = gender && (typeOfPhoto || typeOfPhoto == "");
    let secondConditionPart = true;

    if(numberOfPoints === 93 || numberOfPoints === 68) {
        secondConditionPart = age && wearBiceps && wearChest && wearUnderChest && wearWaist
            && wearHips && wearLowHips && wearThigh && wearKnee && wearCalf && wearAnkle;
    }

    return (firstConditionPart && secondConditionPart) || (type === TEMPLATE_NAMES.HAND_TEMPLATE) || (type === TEMPLATE_NAMES.NEW_HAND_TEMPLATE);
}
