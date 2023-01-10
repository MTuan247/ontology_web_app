module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    phone_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    phone_code: {
      type: Sequelize.STRING
    },
    phone_name: {
      type: Sequelize.STRING
    },
    network_technology: {
      type: Sequelize.STRING
    },
    anounced: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    dimensions: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.STRING
    },
    build: {
      type: Sequelize.STRING
    },
    sim: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    },
    resolution: {
      type: Sequelize.STRING
    },
    protection: {
      type: Sequelize.STRING
    },
    os: {
      type: Sequelize.STRING
    },
    chipset: {
      type: Sequelize.STRING
    },
    cpu: {
      type: Sequelize.STRING
    },
    gpu: {
      type: Sequelize.STRING
    },
    card_slot: {
      type: Sequelize.BOOLEAN
    },
    memory_internal: {
      type: Sequelize.STRING
    },
    main_camera_triple: {
      type: Sequelize.STRING
    },
    main_camera_features: {
      type: Sequelize.STRING
    },
    main_camera_video: {
      type: Sequelize.STRING
    },
    selfie_single: {
      type: Sequelize.STRING
    },
    selfie_features: {
      type: Sequelize.STRING
    },
    selfie_video: {
      type: Sequelize.STRING
    },
    loud_speaker: {
      type: Sequelize.STRING
    },
    jack_3_5_mm: {
      type: Sequelize.BOOLEAN
    },
    wlan: {
      type: Sequelize.STRING
    },
    bluetooth: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    },
    nfc: {
      type: Sequelize.BOOLEAN
    },
    infrared_port: {
      type: Sequelize.BOOLEAN
    },
    sensors: {
      type: Sequelize.STRING
    },
    battery_type: {
      type: Sequelize.STRING
    },
    battery_charging: {
      type: Sequelize.STRING
    },
    colors: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
  });

  return Phone;
};