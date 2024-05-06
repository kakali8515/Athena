<template>
    <div class="info_protection">
         <div class="breadcrumb">
           <p><a href="#">Home </a> <span>></span> Asset management <span>></span> Asset list</p>
       </div>
       <div class="heading flex justify-between align-end">
           <h4>Asset Sharing</h4>
       </div>
       <div class="policy_setting_wrap no-padding">
           <p>* Shared assets are a function that can be shared when an asset is used jointly with another company. When shared, the asset is synchronized between the two companies.</p>
           <div class="datatable_head flex justify-between">
              <h4>View detailed list of shared assets</h4>
              <h4>Shared company: <span>AA Electronics_Security Team_Assistant_Kildong Kim</span></h4>
           </div>
           <div class="datatable_wrap no-padding shadow-none">
              <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
                    role="tablist">
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-one" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        active
                        " id="tabs-one-tab" data-bs-toggle="pill" data-bs-target="#tabs-one" role="tab" aria-controls="tabs-one"
                        aria-selected="true">Server System</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-two" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-two-tab" data-bs-toggle="pill" data-bs-target="#tabs-two" role="tab"
                        aria-controls="tabs-two" aria-selected="false">WEB</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-three" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-three-tab" data-bs-toggle="pill" data-bs-target="#tabs-three" role="tab"
                        aria-controls="tabs-three" aria-selected="false">DBMS</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-four" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-four-tab" data-bs-toggle="pill" data-bs-target="#tabs-four" role="tab"
                        aria-controls="tabs-four" aria-selected="false">Software</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-five" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-five-tab" data-bs-toggle="pill" data-bs-target="#tabs-five" role="tab"
                        aria-controls="tabs-five" aria-selected="false">Network Application</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-six" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-six-tab" data-bs-toggle="pill" data-bs-target="#tabs-six" role="tab"
                        aria-controls="tabs-six" aria-selected="false">Information Protection System</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-seven" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-seven-tab" data-bs-toggle="pill" data-bs-target="#tabs-seven" role="tab"
                        aria-controls="tabs-seven" aria-selected="false">Terminal Document</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a href="#tabs-eight" class="
                        nav-link
                        block
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        border-x-0 border-t-0 border-b-2 border-transparent
                        px-6
                        py-3
                        my-2
                        hover:border-transparent hover:bg-gray-100
                        focus:border-transparent
                        " id="tabs-eight-tab" data-bs-toggle="pill" data-bs-target="#tabs-eight" role="tab"
                        aria-controls="tabs-eight" aria-selected="false">Auxiliary Facilities</a>
                    </li>
                </ul>
                <div class="tab-content" id="tabs-tabContent">
                    <div class="tab-pane fade show active" id="tabs-one" role="tabpanel" aria-labelledby="tabs-one-tab">
                        <div class="policy_setting_wrap_inner">
                            <div class="flex flex-col">
                                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full text-center">
                                        <thead class="bg-gray-50">
                                            <tr>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                No
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                State
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Division
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Hostname
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                User
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Version
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                IP Address
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Asset Code
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                               Usage
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Manager
                                            </th>
                                            <th scope="col" class="justify-center text-sm font-medium text-gray-900 px-6 py-4">
                                                Ranking
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">1</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">2</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">3</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">4</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">5</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">6</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">7</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">8</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">9</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                            <tr class="bg-white border-b">
                                            <td class="px-6 py-4  text-sm font-medium text-gray-900">10</td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               <select>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                                   <option>Dropdown</option>
                                               </select>
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                Lorem Ipsum
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                192.110.10.10
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                                FENOMEN
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               177
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                               Albert Flores
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                             196
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 ">
                                              196
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <nav aria-label="Page navigation example">
                                <ul class="flex list-style-none">
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                                    href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    </a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">1</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">2</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#">3</a></li>
                                <li class="page-item"><a
                                    class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                    href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    </a></li>
                                </ul>
                            </nav>
                            </div>
                    </div>
                    <div class="tab-pane fade" id="tabs-two" role="tabpanel" aria-labelledby="tabs-two-tab">
                        Tab 2 content
                    </div>
                    <div class="tab-pane fade" id="tabs-three" role="tabpanel" aria-labelledby="tabs-three-tab">
                        Tab 3 content
                    </div>
                     <div class="tab-pane fade" id="tabs-four" role="tabpanel" aria-labelledby="tabs-four-tab">
                        Tab 4 content
                    </div>
                     <div class="tab-pane fade" id="tabs-five" role="tabpanel" aria-labelledby="tabs-five-tab">
                        Tab 5 content
                    </div>
                    <div class="tab-pane fade" id="tabs-six" role="tabpanel" aria-labelledby="tabs-six-tab">
                        Tab 6 content
                    </div>
                    <div class="tab-pane fade" id="tabs-seven" role="tabpanel" aria-labelledby="tabs-seven-tab">
                        Tab 7 content
                    </div>
                    <div class="tab-pane fade" id="tabs-eight" role="tabpanel" aria-labelledby="tabs-eight-tab">
                        Tab 8 content
                    </div>
                </div>
                <div class="edit flex justify-end">
                    <button type="button">Reject</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#waitingcompanyapproval">Accept</button>
                </div>
            </div>
       </div>
     
    </div>
    <div class="modal waitingcompanyapproval fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="waitingcompanyapproval" tabindex="-1" aria-labelledby="waitingcompanyapproval" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                    Asset Share Request
                </h5>
                <button type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body relative">
                <div class="payment_completed">
                    <p>Other company reuqest to share their company assesst to you. Plz check</p>
                </div>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 items-center justify-center p-4 rounded-b-md">
                <button type="button"
                class="full_button bordered px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                close
                </button>
                <button type="button"
                class="full_button solid px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Check
                </button>
                
            </div>
            </div>
        </div>
        </div>
</template>


<script>
export default {
  name: 'AssetShareRequestModal',
}
</script>


<style lang="scss">
    
</style>