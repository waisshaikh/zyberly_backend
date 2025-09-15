import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createAdmins = async () => {
  const admins = [
    { email: 'wais@zyberly.in', password: 'Shaikhawais@231' },
    { email: 'mojammil@zyberly.in', password: 'Mojammilkhan@231' },
    { email: 'aliya@zyberly.in', password: 'Aliyakhan@231' },
    { email: 'dilshad@zyberly.in', password: 'DilshadShaikh@231' }
  ];

  for (let admin of admins) {
    const existing = await User.findOne({ email: admin.email });
    if (!existing) {
      const hashed = await bcrypt.hash(admin.password, 10);
      await User.create({ email: admin.email, password: hashed });
      console.log(`Admin created: ${admin.email}`);
    }
  }
};
