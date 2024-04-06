import { Card, Typography } from "@material-tailwind/react";
import { useGetSalesUser } from  "@/lib/react-query/queries";
import {  ISalesUser } from "@/types";
export function HomeSales() {
  const { isLoading, isError, data: staff } = useGetSalesUser();
  console.log('HomeStaff', staff)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  
  return (
    <Card className="h-full w-full overflow-scroll bg-lightblue">
      <h2 className="h3-bold md:h2-bold text-left w-full">Sales</h2>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {["FirstName", "LastName", "Email", "Phone", "EmailField"].map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember:  ISalesUser, index: number) => {
            const isLast = index === staff.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {staffMember.first_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.email}
                  </Typography>
                </td>
              
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.phone}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.emailfield}
                  </Typography>
                </td>
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default HomeSales;