import { NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';

// export async function PUT(request: any) {
//   const id = request.nextUrl.searchParams.get('id');
//   let { fullname, password, email, role } = await request.json();
//   await dbConnect();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json({ message: 'Role deleted' }, { status: 200 });
// }

export const PUT = async (request: any, { params }: any) => {
  try {
    const { id } = params;
    let { fullname, email, role } = await request.json();
    await dbConnect();
    const updateUserValue = {
      fullname,
      //   password,
      email,
      role,
    };
    const userExist = await User.findById(id);
    if (!userExist) {
      //   console.log(result, '000000000000000999988774747477jjhfh');
      return NextResponse.json(
        { message: 'User Not found', userExist },
        { status: 200 }
      );
    } else {
      const result = await User.findByIdAndUpdate(id, updateUserValue);
      return NextResponse.json(
        { message: 'User Updated Successfully', result },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};

export async function DELETE(request: any, { params }: any) {
  try {
    const { id } = params;
    await dbConnect();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
