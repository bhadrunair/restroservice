import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async ({params}:{params:{id:string}}) => {
    const {id} = params;

    const order = await prisma.order.findUnique({
        where: {
            id: id,
        },
    });

    if(order){
        return new NextResponse(JSON.stringify({message:"Order not found!"}), { status:200,});
    }else{
        return new NextResponse(JSON.stringify({message:"Order not found!"}), { status:404,});
    }
}