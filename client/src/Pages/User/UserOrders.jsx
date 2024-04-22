import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const UserOrders = () => {
  return (
    <>
      <Layout>
        <div className="max-w-full flex">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <UserMenu/>
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
          <div className="flex-1">
            <h1 className='text-3xl'>Your Orders</h1>
            <div className="relative flex justify-around top-16">
              <a href='#' className='text-2xl text-blue-500'>Orders</a>
              <a href='#' className='text-2xl text-blue-500'>Order Again</a>
              <a href='#' className='text-2xl text-blue-500'>Cancle Order</a>
            </div>
            <hr className='border-black border-2 mt-20'></hr>
            <div className="flex mt-16 w-full h-auto">
              <div className="orders1 flex border-black border-2 w-full h-2/5">
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EAEQQAAEDAwICBgUJBgMJAAAAAAEAAgMEBRESIQYxExZBUXHRYYGRkpMUFSIyQlJTVbFDVHOhweE1coIHIzM0RWJjsvH/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxEAAgICAAIJAgYCAgMAAAAAAAECAwQREiEFExQVMTJRUqFBYSIzQnGRsVPBIzQkQ4H/2gAMAwEAAhEDEQA/APuKAIAgCAIAgCAIAgNbp42ysic4B786R34WDsipKDfNmSi2t/Q2LMxCAIAgCAIAgCAIAgCA8Pe1mNTgMnAz2rFyS8T1JvwPayPAgCAIAgOeqrIaUZldg/dHNR78mqhbmzZXVOzylZrbl0le2oYfqOGkHsAXN35vHkK6P08C1qx+Gpwf1J+iutNV4a2QNefsHmugx86m/lF8/QrbcayvxXI7gphoMoAgCAHkgNNNUx1LS6F2oA4K1VXQtW4MznCUOTNy2mAQBAa5pWRN1SODR6VhOyNa3J6MoxcnpIgLxWifHRE6Wcs7ZK53pDMVklweC/sssang3xfUkqC6U9Q1jXSBkuBlrtsn0K2xs+q7S3qREtxp1veuRIqeRggCAIDguNrp69wdJqbI0YEjDgjzUbIxKr/Oufqbqr51eUq1yoZYquOkH0pC4NDsY1Z5Fc1kYjhkKlfXwLem9Ot2ehP2zh+lontlcXzTDcOcdmn0BdBjdH00fiXNlZdl2W8vBEwFOIplAEBh2y8YK/ceIICySKlJc76pd3KkzOlYpOFfj6lhRhS2pTI213cUMr9TS6N/Mdx71X4Od2ZtPmmS8jG65L1LXRVUdZAJotWk/eGF09N0boccfAp7K3XLhZ0LaYBAaaqmiqo+jmbqHMb4wtVtMLY8M1tGcJyg9xKxxDSfN9Pqa5zmE5Gefgud6Rw1Q1weDLXEu61vi+h1Wjh2BkUVRX65Z8B+gnDWHw7celWmJ0dVUlJrciJfmTm3GPJHRV8TW6llMZdJIRzMbcgetXsMO2a34FZK+EXpnOeMraObKj3R5rZ3fb9jHtMDB40tg+zUe6PNO77fsO0wMHjW1jm2f3R5p3fd9h2mB5PG9qAzpnx/lHmnd9vqh2mBzy8WWWSqiqHQ1DpIs6SAO31rB9Ezc1N62jNZqUXFeDOjrxau1s4/0jzWzu637GHaYDrxae6f3R5rzu+37DtMB13tXdP7o807vt+w7TWOvFp7p/dHmve7rvsO1QOij4ttVXMIhI+JzjgGQYB9a12YN0FvRlG+EnyOi8WinqoHyxxNbUNBLXtGMkdh71TZeHXfBvX4vUn4+ROuSW+RH8NW2OaJ1TUx6gXYY145YVd0XhRcXOxErNyHtRgyytbpGAAB3BXyWis5/U9L0BAEBpqKaGpYGTsD2hwcAe8cljKEZeZGUZOPgc19kdDaap8Zw4M2PdnZb8eKlbFM1WPUGz5pK7LiV0CKwlIqG3UFr+cb1KWxuGWt5eHLcqvuyrHZwVIlV0x4eKRz19Dbq2zyXWxSOeyIEujJO4HPnuCsqcq2Nihd9ROiLjxQN1zh4bs9HSz3PpIxUABhBecuxk8lpWVkSm4w+hs6itR5muus1DHVWuWnc91LVyBhaTvgtJBHatkM22UJqXijCWPHiWvA2VFLwzFdBa5JJIqx+NLNbu3lvyWtZWU48a8DLqKt6NVusNOL1WUVZqlZHE2SJ2rTkE43x4LbbnTdUZwfMwhjriakcstXwi0yM01epuWn/dy4DhtzxhYRyMt69DN01G6OlsNLw7S3W5CSOOVrdTg5x3PLYL2eVkda4RYjRXw7Nd1ttudY2Xa0yP6E4P0yfpNO3buFtxsuyVnV2Gu2mKjxRK8HZGys9EQ+xcNSyVFgoZJXFzzEMnvwuZyYqNski1re4Ikw0DlstJmZQBAEAQBARvEX+C1X+T+q3435sTXb5GfNZM7q+RWkvxBb5eIeFqVlAWvkhcwujLsZxsQqmMlRktzJ+uOpaNVPTu4b4PuL6/SySRriIwQdy3AHimRYsi6PAKoOEHs67tfI7JR2X5RTCaGo0skcecY0D6QWmFMrZyUfFGyUkktnPf4at/E1iqmTdJbelwGtGzXkHBJ9I5LOnhVdifmMZb4os5rxw7X13GENxijaKVjonGQuGRpOTtzW2nIhDHcH48zGdcpTTRK0tZHU8ZVsUZB6CjY15H3i4nCjODVMW/qzYnuTI2rq+LphUQ/M9H0TtbA/pty05APsWyuFCabm/wCDFuf0R6bdRYuCrdUvgFQ1ojjkaewZwSPDC8dfXXyUX6ji4YLY4vMtbZIKmgkDqPGp7GD6w7D6u5bsBxha1NczC9Ph2vAqDSdPNXf1K9n2ThXbh6g/hBc1lfnSLSryIlloNgQBAEAQBAcd2p3VdtqII/rvYQ3x7FsqnwTUjGa3Fo+WVMrIpnxSno5WnDmO2IPguhhzW0VrTT0aI7hJTP1UtS6InmWu5r2dMbFqSEZyi+RxV9RLcHA1tU6YNOwc7b2JXRCvyxMpWzl4nmtqJq5kUdXUOlji/wCG1x+rthewphW9xR47JyWme23Kviijhhrntij+o3I2xyWEsWqT24mUbbEtGJLvdJAQ65TYIwfpBeLDoX6T3r7DmpKmooHvko6l0T5Pruad3LZOiuaUZLkjGM5x8Deb3djzuc3tHksOx0fSJl19hySVdTPStopapz6dpGmIkYzlbFRVCXGlzMXbNrTJSNtfSUgp6StkEBbgw9m/MLW6aXLiceY6yWtHLRUlRUVDaeCJzpScAYW6c4wXE2YKDk9I+1WmlNFbKamccuijDT4rmbZ8c3Is4rUUjsWsyCAIAgCAxlAQj7s5l4ZCXgU7yWcu3sKqYdIby3W/L9Cb2X/g4vqddxsttuhBuFDDOQNnPbv7VcwtnDyvRAcU/E4epnDn5RT+w+a2dpu9zHBH0HUvhv8AKKb2HzTtN3uHBH0M9TOHPyim9h8152i33Dgj6DqZw3+UU3sPmnaLfcOCPoaG8K8LOqXUwtVKZGt1FuDy9q1rNm5uClzRk6dR4tcjd1L4b/J6b2FbO02+4x4I+g6l8N/k9N7CnaLfcOCPoQvFNisNqoWOpLZTx1L34Y5o3bjmVLw522WbcuSNF+ox5FWVsQjfRVk9DOJqaTRINs94WFlcbFqSMoycXtFysfFjKuaOlrWNjmedLXtP0XH+iqsjBdacoc0TK71J6ZaVAJAQBAEBgoCHuz7i1x6KMug/8Z39YVTndr3/AMfl+3iTcfqP1eJWLjUCOVhcDqOwGN8rnpcXFy8S1rimixWF13c9vytgZS4/aH6fox/ddHgLL/8Ab4ffxKvL7OvI+fwToVoQTKAwUBHXC709E8xOdmXGdOcKDlZ9eO+F+JJpxZ2ra8CsG6uiujKwHkTqHeD2Ln68yUcjrvX/AGWjx1Knq/QtNqu1NctQgJD2jLmEcl0eLmV5KfAVN2NOnzEgpZoPnPHNeDdnskcGx07Q0esZP6q6wK9Vb9SBkNueiu0tTHVQNlhOWHO6nGlpxembSMjB5Lw8LLw5w1HWNorg2oZojk1PYG75B5ZVbk5UoN16JdVUZJSL8qolhAEAQBAEBXnWJ0nELKp4HyVmZAD97ux/NVUMDWW7f0/7J/a//H4P1f6LAFakAygCAFActbQU1dHoqYWPHeRuPArVbRXatTWzZXbOt7i9FOgsrqjiN1DOx3yaAayfvN+yM+n+ioaej95ThJfhRcTy+HGU4v8AEy60tLDSsEdPEyJg7GDC6CFcYLUVpFLOcpvcns3LMxKpdeCaW6391xrJnup3NGqmGwc4DG57sDkpccucKurRjwR3sgOKbTHabu35LE2OkqmZYxowGvaMEDxGD6ip2Dc5wcX4oj5MP1EP6lPIZZOCLj8nuDqJ7voVG7Rnk4DyVdn1cUOP0JGNP8XCX5VBOCAIAgCAIDRUVEVMzXM4NGceJWuy2NUeKb5GUIOb1Egq3iyOFxbTW+qnI7cBo/mVXT6Wpj5Vsn19HTl5pJHKzjGocN7PM0+l4Wl9MxX6fk2voyP+Qz1wmzva3/EC8fTUfb8juxe8wOM5Dytjz4SL3vlewd2L3jrjP+VSe+vO+Y+35Hdi95564yg5+aZM9+sJ3zH2/I7sXvMHjWYf9Jk+IF73zH2/J73WveY67zdtqeB/E/snfMfb8jute/4HXeX8qf8AFHknfEfb8jute8i7/wAQm8UPQOtz4pGO1xya86XBSsPpuMbo7Wk+XiY2dFrgep7K9CJZ3MEgMermSDpb6ua6O/prCq5ce/25lLX0XkT5qJfeGuGoKOaOv+U9K8A4DRgb+O6j25/Xw1HwYjj9XLn4lqUU2hAEAQHl5IaSBk45d6ArlVdekaWSVNTTv+02OA7HxwgIV8NAKptVNdLg4tPKSI6ST/pUXJphbBqyWkSKrHF/gjs9unthzmul+GfJVvd2H/k+US1k3+z+zwZbX++y+5/Zed3YX+T5Q7Vkez+zstoo39I+nlMxBAJc3GFLxMLHrblW+J/uaL8i6S1JaOO/MaxscrAA/XpIA5hael6odVx/U3dH2Sc+H6HI05AXNlqZQHlybBI0EUXycP0hznZzkZx6F0/RePWqFPW2ynzbZ9Zw70jmrKOn6UONT0Grk3AwVlkdH405cTfD/Apy7lHSWzmfQsd9S4R+to81o7txf8j+Dd22/wBn9mI7Y4vBNfGfQAPNe924vv8A6PHm3+z+ySo7VUQyGaGuq26t8MxhWdVSrgoxe0QrbeOW5R0ywUdRcGFrCXTZPN7cfotxoJoIDKAIAgCAiuIRmgb/ABW/qq7pT/rP90S8L80qkjRqd9HtXK7LlM1lgP2V5s92eWl0TsxEtd3hb6ciyl7rejGyuFi1NGubpJnB0sjnY5ZK9uyrb+c3sVVQrWooyAo5sHbhebPDB3Q9DJZYCTE/SDzHMKZj5tuP5XyNNuPXb5kapi6ok1ynURsPR4LC7JsulxTezOuuNUeGAETfurRs2bMsjGoYHah4z6BZxi2wD/tXZYf5Ef2OfyfzWdykmgIAgCAIAgI++U5qLXUNb9ZrdbfEbqLmV9ZRKJvxp8FqbKNrLgHAnf0rjS/0QF7c+Ouadb8OYMAOUirTiS6EnEvfAhZVcPOa9oc5kr2ZcMnsP9V0HR8ITx9NepRdJ7hkcnyIGQFr3DfYkb+K5iS09FkntJnui/xShB5GoaCO8bqThJPIjsxu31Uv2PoXyeH8KP3Quu6qv2r+DneOfqfOScz1H8aT2aiuOyfzpfudJHyr9kbqNnSVcLcDeRo/msaI8VsV90Y2y4YNkj/tIe2mtVMyFoY582ctGNgD5roek4xjUkkQuidztbb3yKfw5rkfNI9xcAA0ZKoLdLSLrI5aRYYGF8rQAtcI8UkiHJ6Wy/0sYhp44x9loC7WqChBRRzk5cUmzathiEAQBAEAQGHAFpB5FePmgfOKiI01TPAecchaPBcTkV9VbKHozpK58cFL1K3xgC2np52nGh5aT6D/APFsxdNtE7F8WiCprlV07S2CrniaTkhkhAypico8kyTKmEn+JJl1opTLRwSEkl0bSSe04VZPlJlbNak0cl9kfDQdLG9zHtkbhzTghbKG1NaNuOk56ZBG7XD9/qvjO81N6yz3P+SV2er2r+Cx2dxdbonuJLnZJJPM5Vfb52Q7klNpHu6zOp7fNLG5zHhuzmnBByvavOjyqKlNJlNqLhVVAb09TNKBuBJIXY9qsG5S8z2WUaoR8q0WfhWMi2dIecjyfYoV/n0Qsp/j0Wuxw9LXxjsByfUpHR1fWZEfsVmXPgqZdgutKIIAgCAIAgCAHkgKXfI2G5VTiN9Y/wDULkuk/wDtSLvEb6mJE1FNBOwMmibIznhwyoKk4vaJkZNeBzm2UH7pD7qz62fqZ9bP1N7Y442taxga1owAOxa22+bMG2/E8zQxTM0Sxh7O4om1zQTa8DT830ed6eL3Vl1kvUz6yfqb442RsDGNDWjkAOSxb29sxbb5s8zRRzRlkjA5p5g9qJtPaCbXgafm6j/dYvdWfWz9TLrZ+p0RRshjEcLAxg5NAxhYttvbMW23tlg4U/5w/wAM/qFbdDfnP9iuz/y1+5bByXSlQEAQBAEAQBACgKXfTi5VLSRkuBxns0hcn0pyypf/AAu8PnSiMJHeq8lmCfBD3RgnwXg0YJ8Pag0MjvCAxnKAIDKAyOa9BPcKA/KnHH2D+quOhvzX+xX9IeRFrXSFQEAQBAEAQBAEBHXKyUFzeJKuEl4GNTXlpx6lGuxKbnuaN9WTZUtQZxdUbP8Agy/Hd5rR3Zi+35Zt7ff6/CHVGz/gy/Gd5p3Xi+35Y7ff6/CHVGz/AIMvxnead2Yvt+WO33+vwh1StH4Mvxnead2Yvt+WO33+vwjPVO0fgy/Gd5p3Zi+35Y7ff6/CMjhW0j9lL8Z3mndmL7flnnbr/X4Rnqvavw5fjO807sxfb8sduv8AX4R6HDVsH7OT4rl73bje3+x22/1+Eexw9bRyif8AEPmnduN7flnnbLvU7aOhp6MEU8enPPdSaseupagtGmy2dnmZ0rcawgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgP/Z" alt="order1" className=''/>
                  <div className='flex flex-col mt-4 w-28'>
                    <h1>Name: Product name</h1>
                    <h1>Price:699</h1>
                    <h1>Quantity:2</h1>
                  </div>
                  <div className="action flex flex-col justify-center items-end" style={{marginLeft:795}}>
                    <MdModeEdit className='text-black mx-4 my-4 w-56 h-8 bg-blue-700 hover:bg-blue-900  hover:text-white rounded-full'/>
                    <RiDeleteBin5Fill className='text-black mx-4 bg-red-700 hover:bg-red-900 w-56 h-8 hover:text-white rounded-full'/>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UserOrders
